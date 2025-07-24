import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authcontext';
import EditUserProfile from '../components/EditUserProfile';
import EditNgoProfile from '../components/EditNgoProfile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditProfile = () => {
  const { message, setMessage } = useMessage();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !isLoggedIn) return;

      try {
        const res = await axios.get(`${BASE_URL}/user/profile/${user.username}`);
        setProfileData(res.data.user || {});
      } catch (err) {
        const errorMessage = err?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
        navigate('/'); // redirect home or show error page
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) return <p>Loading profile data...</p>;

  return (
    <>
      {user.role === 'user' ? (
        <EditUserProfile userData={profileData} />
      ) : (
        <EditNgoProfile userData={profileData} />
      )}
    </>
  );
};

export default EditProfile;
