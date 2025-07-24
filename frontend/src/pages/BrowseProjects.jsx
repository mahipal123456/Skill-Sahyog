import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import {useContext} from 'react'
import { AuthContext } from '../contexts/authcontext';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BrowseProjects = () => {
  const { message, setMessage } = useMessage();
  const [projects, setProjects] = useState(null);
  const {user}= useContext(AuthContext);
  
  const style = {
  maxWidth: "720px",
  margin: "1.5rem auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  fontFamily: '"Segoe UI", sans-serif'
};
const token = localStorage.getItem('token');
 

  useEffect(() => {

    async function fetchProjects() {
      try {
        const res = await axios.get(`${BASE_URL}/api/getprojects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data.projects || res.data.projects.length === 0) {
          setMessage("No Projects to Show")
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
    return(<p>loding.....</p>)
 }
 if (projects.length===0) {
    return(<p>no project to show</p>)
 }
  return (
    <div style={style}>
      {projects.map((proj) => (
        <ProjectCard key={proj._id} project={proj} user={user}/>
          
      
      ))}
    </div>
  );
}
export default BrowseProjects