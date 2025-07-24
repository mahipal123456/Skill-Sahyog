import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom'; // to get projectId from route
import ProjectCard from '../components/ProjectCard';
import {useContext} from 'react'
import { AuthContext } from '../contexts/authcontext';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectDetails = () => {
  const { message, setMessage } = useMessage();
  const { projectId } = useParams();
  const {user}= useContext(AuthContext);
   // assumes route is /project/:projectId
  const [project, setProject] = useState(null);
  const navigate=useNavigate();
const style = {
  maxWidth: "720px",
  margin: "1.5rem auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  fontFamily: '"Segoe UI", sans-serif'
};

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchProject() {
      try {
        const res = await axios.get(`${BASE_URL}/api/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Directly check the status and content
        
          setProject(res.data); // it's a single project object
        

      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
        
      }
    }

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <p>Loading project...</p>;
  }
  return (
    <div style={style}>
    <ProjectCard project={project} user={user}/>
  </div>
  );
};

export default ProjectDetails;
