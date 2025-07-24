import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProjectList from '../components/ProjectList.jsx'
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppliedProjects = () => {
  const { message, setMessage } = useMessage();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchProjects() {
      try {
        const res = await axios.get(`${BASE_URL}/api/appliedprojects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data.projects || res.data.projects.length === 0) {
          setMessage("No projects applied yet");
          
        }

        setProjects(res.data.projects);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
      }
    }

    fetchProjects();
  }, []);
  
 
if (!projects) {
  return <p>loding.....</p>
}
  return (
       <ProjectList projects={projects}/>
  );
};

export default  AppliedProjects;
