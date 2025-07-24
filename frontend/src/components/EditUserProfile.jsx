import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import './Edituserprofile.css';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditUserProfile = ({ userData }) => {
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();
  const initialData=userData.userProfile;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  useEffect(() => {
    if (initialData) {
      reset({
        intro: initialData.intro || '',
        topSkills: initialData.topSkills?.join(', ') || '',
        github: initialData.github || '',
        linkedin: initialData.linkedin || '',
        resume: initialData.resume || '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(data);

      const res =await axios.put(
        `${BASE_URL}/user/edituserprofile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message)
       navigate(`/profile/${userData.username}`);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
    }
  };

  return (
    <div className="edit-user-profile">
      <h2 className="edit-user-profile__title">Edit Your Profile</h2>
      <form className="edit-user-profile__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="edit-user-profile__label">Intro</label>
        <textarea
          className="edit-user-profile__textarea"
          {...register("intro", { required: true })}
        />
        {errors.intro && <span className="edit-user-profile__error">Intro is required</span>}

        <label className="edit-user-profile__label">Top Skills (comma separated)</label>
        <input
          type="text"
          placeholder="e.g. React, Node.js, MongoDB"
          className="edit-user-profile__input"
          {...register("topSkills", { required: true })}
        />
        {errors.topSkills && <span className="edit-user-profile__error">Skills required</span>}

        <label className="edit-user-profile__label">GitHub</label>
        <input
          type="url"
          placeholder="https://github.com/username"
          className="edit-user-profile__input"
          {...register("github", { required: true })}
        />
        {errors.github && <span className="edit-user-profile__error">link required</span>}

        <label className="edit-user-profile__label">LinkedIn</label>
        <input
          type="url"
          placeholder="https://linkedin.com/in/username"
          className="edit-user-profile__input"
          {...register("linkedin", { required: true })}
        />
        {errors.linkedin && <span className="edit-user-profile__error">link required</span>}
        <label className="edit-user-profile__label">Resume</label>
        <input
          type="url"
          placeholder="https://resume.com/username"
          className="edit-user-profile__input"
          {...register("resume", { required: true })}
        />
        {errors.resume && <span className="edit-user-profile__error">link required</span>}
        <button type="submit" className="edit-user-profile__button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditUserProfile;
