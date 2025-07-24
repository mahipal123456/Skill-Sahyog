const express= require('express');
const Project= require('../models/Projectmodel')
const User= require('../models/Usermodel');

const verifytoken= require('../middleware/varifitoken')
const authorizeRoles =require('../middleware/roleauth')
const router = express.Router();


router.get('/profile/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Find user by username and populate postedProjects only if ngo
    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'ngo' && user.ngoProfile && user.ngoProfile.postedProjects.length > 0) {
      // Populate latest 2 posted projects for ngo
      const latestProjects = await Project.find({
        _id: { $in: user.ngoProfile.postedProjects }
      })
        .sort({ createdAt: -1 })
        .limit(2)
        .select('title description createdAt status deadline')
        .lean();
      delete user.ngoProfile.postedProjects;
      user.latestProjects = latestProjects;
      
      return res.status(200).json({user});
    } else {
      // For regular users or ngos with no projects, just return user profile
      return res.status(200).json({ user });
    }

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'internal Server error' });
  }
});

router.put('/editngoprofile', verifytoken, authorizeRoles(['ngo']), async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      organizationName,
      mission,
      foundedYear,
      website,
      address,
      contactEmail,
      
      socialLinks
    } = req.body;

    // ✅ Check for missing required fields
    if (
      !organizationName ||
      !mission ||
      !foundedYear ||
      !website ||
      !address ||
      !contactEmail ||
      !socialLinks ||
      !socialLinks.facebook ||
      !socialLinks.linkedin ||
      !socialLinks.instagram
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findById(userId);

   

    user.ngoProfile.organizationName = organizationName;
    user.ngoProfile.mission = mission;
    user.ngoProfile.foundedYear = foundedYear;
    user.ngoProfile.website = website;
    user.ngoProfile.address = address;
    user.ngoProfile.contactEmail = contactEmail;
    
    user.ngoProfile.socialLinks = {
      facebook: socialLinks.facebook,
      linkedin: socialLinks.linkedin,
      instagram: socialLinks.instagram
    };

    await user.save();

    res.status(200).json({ message: 'profile updated successfully' });
  } catch (error) {
    console.error('Error updating NGO profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/edituserprofile',verifytoken,authorizeRoles(['user']),async (req,res)=>{
      const {intro,topSkills,github,linkedin,resume}=req.body;
      try {
        const user= await User.findById(req.user.userId);
        if (!user.userProfile) {
        user.userProfile = userProfileSchema.cast({}, user);

      }
        user.userProfile.socialLinks={github,linkedin,resume}
        user.userProfile.intro=intro;
        user.userProfile.topSkills = topSkills.split(',').map(skill => skill.trim());
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
      } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Internal server error' });
        
      }
});


module.exports= router