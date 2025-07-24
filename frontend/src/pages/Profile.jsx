import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import {useEffect,useState} from 'react'
import UserProfile from '../components/UserProfile';
import NgoProfile from '../components/NgoProfile';
import {useContext} from 'react'
import { AuthContext } from '../contexts/authcontext';
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const { message, setMessage } = useMessage();
  const { username } = useParams();
  const {user}= useContext(AuthContext);
  const isOwner = user?.username === username;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/profile/${username}`);
      setUserData(res.data.user);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      setMessage(errorMessage)
    }
  };

  fetchUser();
}, [username]);

  const role= userData?.role;
  
  if (!userData) return <p>Loading profile data...</p>;

  return (
    <>
    {role==='user' && <UserProfile user_data={userData} isowner={isOwner} />}
    {role==='ngo' && <NgoProfile user_data={userData} isowner={isOwner} />}
    </>
  )
}

export default Profile