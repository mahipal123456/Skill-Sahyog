const express=require('express');
const router = express.Router();
const Project= require('../models/Projectmodel');
const User= require('../models/Usermodel');
const verifytoken= require('../middleware/varifitoken')
const authorizeRoles =require('../middleware/roleauth')

router.post('/postproject',verifytoken,authorizeRoles(['ngo']),async(req,res)=>{
    
    const { title, description, requiredSkills, deadline } = req.body;
    const processedSkills = requiredSkills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0); 
     try {
        const projectData = {
        title,
        description,
        requiredSkills:processedSkills,
        deadline,
        postedBy: req.user.userId // ✅ coming from JWT token
        };

        const project = new Project(projectData);
        await project.save();
        const ngo= await User.findById(req.user.userId);
        
        
        
        ngo.ngoProfile.postedProjects.push(project._id);

        
        await ngo.save();


        res.status(201).json({ message: 'Project posted successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting project' });

  }
});
router.get('/postedprojects', verifytoken, authorizeRoles(['ngo']), async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find NGO user and populate postedProjects with only the title field
    const user = await User.findById(userId).populate({
      path: 'ngoProfile.postedProjects',
      select: 'title'
    });

    // If user or ngoProfile not found, return empty projects list with 200 OK
    if (!user || !user.ngoProfile) {
      return res.status(200).json({ projects: [] });
    }

    const postedProjects = user.ngoProfile.postedProjects || [];

    // Always return 200 with the projects array (empty or with items)
    return res.status(200).json({ projects: postedProjects });

  } catch (error) {
    console.error("Error fetching posted projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/project/:projectId', verifytoken, authorizeRoles(['user','ngo']),async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    const project = await Project.findById(req.params.projectId)
      .populate('postedBy', 'username') // only fetch username
      .lean(); // so we can modify the object

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
     delete project.entries;
    // Attach flags directly to the project object
    if (role === 'user') {
      project.isApplied = project.applicants.some(applicant => 
        applicant.user.toString() === userId
      );
    }

    if (role === 'ngo') {
      project.isOwner = project.postedBy._id.toString() === userId;
    }

    res.status(200).json(project);

  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete('/deleteproject/:projectid', verifytoken, authorizeRoles(['ngo']), async (req, res) => {
  try {
    const projectId = req.params.projectid;
    const userId = req.user.userId;

    //  First, find the project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the current user is the owner
    if (project.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Not the owner of the project' });
    }

    //  Delete the project
    await Project.findByIdAndDelete(projectId);

    //  Remove project from NGO's postedProjects
    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          "ngoProfile.postedProjects": projectId
        }
      }
    );

    // Remove project from all users' appliedProjects
    await User.updateMany(
      { "userProfile.appliedProjects.project": projectId },
      {
        $pull: {
          "userProfile.appliedProjects": { project: projectId }
        }
      }
    );

    return res.status(200).json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/project/:projectId/applicants', verifytoken, authorizeRoles(['ngo','user']), async (req, res) => {
  const { projectId } = req.params;

  try {
    // Populate 'user' field inside applicants array with only username and _id
    const project = await Project.findById(projectId).populate({
      path: 'applicants.user',
      select: 'username _id'
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const applicants = project.applicants || [];

    if (applicants.length === 0) {
      return res.status(200).json({ applicants: [], message: "No applicants yet" });
    }

    // Return applicants as an array inside an object for consistency
    return res.status(200).json({ applicants });

  } catch (error) {
    console.error("Error fetching project applicants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.get(
  '/project/:projectId/entries',
  verifytoken,
  authorizeRoles(['ngo']),
  async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.userId;

    try {
      const project = await Project.findById(projectId)
        .populate('postedBy', '_id'); // <-- populate to check owner

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Check if current user is the owner
      if (project.postedBy._id.toString() !== userId) {
        return res.status(403).json({ message: "Access denied. You are not the owner of this project." });
      }

      if (!project.entries || project.entries.length === 0) {
        return res.status(200).json([]); // safe default for empty
      }

      return res.status(200).json(project.entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
      return res.status(500).json({ message: "inernal server error" });
    }
  }
);
router.get('/getprojects', verifytoken, authorizeRoles(['user']), async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: 'postedBy',
      select: 'username'  // Only include the username field
    });

    if (!projects || projects.length === 0) {
      return res.status(200).json({ projects: [] });
    }

    return res.status(200).json({ projects });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.get('/appliedprojects', verifytoken, authorizeRoles(['user']), async (req, res) => {
  try {
    const userId = req.user.userId;

    const userData = await User.findById(userId)
      .populate({
        path: 'userProfile.appliedProjects.project',
        select: 'title'
      })
      .lean();

    const appliedProjects = userData.userProfile?.appliedProjects || [];

    if (appliedProjects.length === 0) {
      return res.status(200).json({ projects: [] });
    }

    const projectTitles = appliedProjects.map(applied => ({
      _id: applied.project?._id,
      title: applied.project?.title,
      status: applied.status
    }));

    return res.status(200).json({ projects: projectTitles });

  } catch (error) {
    console.error("Error fetching applied projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/applyproject/:projectid', verifytoken, authorizeRoles(['user']), async (req, res) => {
  try {
    const projectId = req.params.projectid;
    const userId = req.user.userId;

    // Validate project existence
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user already applied
    const alreadyApplied = project.applicants.some(app => app.user.toString() === userId);
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this project' });
    }

    // Add applicant to project
    project.applicants.push({ user: userId });

    // Fetch user and ensure profile structure
    const user = await User.findById(userId);
    if (!user.userProfile) {
      user.userProfile = { appliedProjects: [] };
    } else if (!Array.isArray(user.userProfile.appliedProjects)) {
      user.userProfile.appliedProjects = [];
    }

    // Add project to user's applied projects
    user.userProfile.appliedProjects.push({ project: projectId });
    user.userProfile.stats.applied = (user.userProfile.stats.applied || 0) + 1;
    // Save both documents
    await project.save();
    await user.save();

    return res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    console.error('Error applying to project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/submitproject/:projectId', verifytoken,authorizeRoles(['user']), async (req, res) => {
  const { projectId } = req.params;
  const { link } = req.body;
  const userId = req.user.userId;

  if (!link) {
    return res.status(400).json({ message: "Link is required" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    
    // Check if entry already exists for this user
    const existingEntryIndex = project.entries.findIndex(
      entry => entry.submittedBy.toString() === userId
    );

    if (existingEntryIndex !== -1) {
      // Update existing entry
      project.entries[existingEntryIndex].submittedBy =req.user.username;
      project.entries[existingEntryIndex].fileUrl = link;
      project.entries[existingEntryIndex].submittedAt = new Date();
    } else {
      // Add new entry
      project.entries.push({
        submittedBy: req.user.username,
        fileUrl: link,
      });
    }
    console.log(project.entries); 
    
    await project.save();

    res.status(200).json({ message: "Project submitted successfully" });
  } catch (err) {
    console.error("Error submitting project:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports= router;