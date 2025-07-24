import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './PostNewProject.css'
import {useNavigate} from 'react-router-dom'

import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostNewProject = () => {
  const { message, setMessage } = useMessage();
  const navigate=useNavigate();
  const token=localStorage.getItem('token')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
        } = useForm();
    async function postProject(data){
    try {
      const res= await axios.post(`${BASE_URL}/api/postproject`,data, {
      headers: {
        Authorization: `Bearer ${token}` //
      }
    })
    setMessage(res.data.message)
    navigate('/posted-projects')      
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
    }
        
    
  }
    
  
  return (
   <div className="project-form-container">
      <h2 className="form-title">Post a New Project</h2>
      <form onSubmit={handleSubmit(postProject)} className="project-form">

        <div className="form-group">
          <label>Title</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span className="error">Title is required</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description", { required: true })} />
          {errors.description && <span className="error">Description is required</span>}
        </div>

        <div className="form-group">
          <label>Required Skills(comma separated)</label>
          <input type="text" placeholder="e.g. React, Node.js" {...register("requiredSkills", { required: true })} />
          {errors.requiredSkills && <span className="error">Skills are required</span>}
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input type="date" {...register("deadline", { required: true })} />
          {errors.deadline && <span className="error">Deadline is required</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Post New Project"}
        </button>
      </form>
    </div>
    
  )
}

export default PostNewProject