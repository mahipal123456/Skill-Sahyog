import React from "react";
import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from 'react'
import { useForm } from 'react-hook-form';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectCard = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { message, setMessage } = useMessage();
  const [isOpen,setIsOpen]=useState(false)
  const project=props.project;
  const isApplied= props.isApplied;
  const isowner=props.isOwner;
  const user=props.user;
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  async function handleDelete(projectid) {
    try {
      const res= await axios.delete(`${BASE_URL}/api/deleteproject/${projectid}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      navigate('/posted-projects') 
      setMessage(res.data.message)     
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
    }
  }
  async function ApplyProject(projectid){
    try {
      const res = await axios.post(`${BASE_URL}/api/applyproject/${projectid}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.message)  
      
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
    }
  }
  async function ProjectSubmit(data) {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/submitproject/${project._id}`,
      { link: data.link }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessage(res.data.message);
    setIsOpen(false);
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Something went wrong";
    setMessage(errorMessage);
  }
}


  return (<>
        {isOpen&& (<form className="submitlink-form" onSubmit={handleSubmit(ProjectSubmit)}>
          <div className="submitlink-group">
            <input
              type="url"
              placeholder="Enter project link"
              className="submitlink-input"
              {...register("link", { required: "Link is required" })}
            />
            {errors.link && <span className="submitlink-error">{errors.link.message}</span>}
          </div>

          <div className="submitlink-group">
            <button type="submit" className="submitlink-btn">
              Submit Link
            </button>
          </div>
        </form>)}
    <div className="feed-post">
      <div className="post-header">
        <div className="logo-placeholder">
          {project.postedBy.username.charAt(0).toUpperCase()}
        </div>
        <div className="ngo-info">
          <h4>@{project.postedBy.username}</h4>
          <span className="status-tag">{project.status}</span>
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>

      <p className="description">{project.description}</p>

      <div className="skills-line">
        {project.requiredSkills.map((skill, idx) => (
          <span key={idx} className="skill-badge">{skill}</span>
        ))}
      </div>

      <div className="feed-footer">
        <span className="deadline">
          Deadline: {new Date(project.deadline).toLocaleDateString()}
        </span>
        <div className="action-buttons">
          {user.role === 'user' && (
            <>
              {project.isApplied ? (
                <button onClick={()=>setIsOpen(true)} className="btn submit">Submit Work</button>
              ) : (
                <button onClick={() => ApplyProject(project._id)} className="btn apply">Apply</button>
              )}
            </>
          )}

          {user.role === 'ngo' && project.isOwner && (
            <>
              <button
                className="btn entries"
                onClick={() => navigate(`/project/${project._id}/entries`)}
              >
                View Entries
              </button>
              <button
                className="btn delete"
                onClick={() => handleDelete(project._id)}
              >
                Delete Project
              </button>
            </>
          )}

          <button className="btn view" onClick={() => navigate(`/project/${project._id}/applicants`)}>
            View Applicants
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default ProjectCard;
