import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import './Editngoprofile.css';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const EditNgoProfile = ({userData}) => {
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();
    const initialData=userData.ngoProfile;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  useEffect(() => {
  if (initialData) {
    reset({
      organizationName: initialData.organizationName || '',
      mission: initialData.mission || '',
      foundedYear: initialData.foundedYear || '',
      website: initialData.website || '',
      address: initialData.address || '',
      contactEmail: initialData.contactEmail || '',
      facebook: initialData.socialLinks?.facebook || '',
      linkedin: initialData.socialLinks?.linkedin || '',
      instagram: initialData.socialLinks?.instagram || '',
    });
  }
}, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const formattedData = {
        ...data,
        socialLinks: {
          facebook: data.facebook || "",
          linkedin: data.linkedin || "",
          instagram: data.instagram || ""
        }
      };

      delete formattedData.facebook;
      delete formattedData.linkedin;
      delete formattedData.instagram;

      const res= await axios.put(
        `${BASE_URL}/user/editngoprofile`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message)
      navigate(`/profile/${userData.username}`);
    }catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
    }
  };

  return (
    <div className="edit-ngo-profile">
      <h2 className="edit-ngo-profile__title">Edit NGO Profile</h2>
      <form className="edit-ngo-profile__form" onSubmit={handleSubmit(onSubmit)}>

        <label className="edit-ngo-profile__label">Organization Name</label>
        <input
          type="text"
          className="edit-ngo-profile__input"
          {...register("organizationName", { required: true })}
        />
        {errors.organizationName && <span className="edit-ngo-profile__error">Organization name is required</span>}

        <label className="edit-ngo-profile__label">Mission</label>
        <textarea
          className="edit-ngo-profile__textarea"
          {...register("mission", { required: true })}
        />
        {errors.mission && <span className="edit-ngo-profile__error">Mission is required</span>}

        <label className="edit-ngo-profile__label">Founded Year</label>
        <input
          type="number"
          className="edit-ngo-profile__input"
          {...register("foundedYear", { required: true, min: 1800, max: new Date().getFullYear() })}
        />
        {errors.foundedYear && <span className="edit-ngo-profile__error">Valid year is required</span>}

        <label className="edit-ngo-profile__label">Website/Profile Link</label>
        <input
          type="url"
          className="edit-ngo-profile__input"
          {...register("website" ,{ required: true })}
        />

        <label className="edit-ngo-profile__label">Address</label>
        <textarea
          className="edit-ngo-profile__textarea"
          {...register("address", { required: true })}
        />
        {errors.address && <span className="edit-ngo-profile__error">Address is required</span>}

        <label className="edit-ngo-profile__label">Contact Email</label>
        <input
          type="email"
          className="edit-ngo-profile__input"
          {...register("contactEmail", { required: true })}
        />
        {errors.contactEmail && <span className="edit-ngo-profile__error">Valid email is required</span>}

        
        <label className="edit-ngo-profile__label">Facebook</label>
        <input
          type="url"
          className="edit-ngo-profile__input"
          {...register("facebook",{ required: true })}
        />
        {errors.facebook && <span className="edit-ngo-profile__error">link is required</span>}

        <label className="edit-ngo-profile__label">LinkedIn</label>
        <input
          type="url"
          className="edit-ngo-profile__input"
          {...register("linkedin",{ required: true })}
        />
        {errors.linkedin && <span className="edit-ngo-profile__error">link is required</span>}
        <label className="edit-ngo-profile__label">Instagram</label>
        <input
          type="url"
          className="edit-ngo-profile__input"
          {...register("instagram",{ required: true })}
        />
        {errors.instagram && <span className="edit-ngo-profile__error">link is required</span>}
        <button type="submit" className="edit-ngo-profile__button">
          Update NGO Profile
        </button>
      </form>
    </div>
  );
};

export default EditNgoProfile;
