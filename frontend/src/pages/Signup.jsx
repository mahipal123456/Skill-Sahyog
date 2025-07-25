import { useForm } from 'react-hook-form';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import './Signup.css'

import { AuthContext } from '../contexts/authcontext'; 
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const { message, setMessage } = useMessage();
     const { setUser, setIsLoggedIn } = useContext(AuthContext);
    const navigate=useNavigate()
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
        } = useForm();
    async function formSubmit(data){
        try{
        const res= await axios.post(`${BASE_URL}/auth/signup`,data);
        
         localStorage.setItem('token',res.data.token)
        const decoded = jwtDecode(res.data.token);
        setUser(decoded);
        setIsLoggedIn(true)
        navigate('/edit-profile');
        setMessage(res.data.message);
        }

        catch(error){
            const errorMessage = error?.response?.data?.message || "Something went wrong";
            setMessage(errorMessage);
        }
    }
    return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <select {...register("role", { required: true })} className="form-input">
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="ngo">NGO</option>
          </select>
          {errors.role && <span className="form-error">Role is required</span>}
        </div>

        <div className="form-group">
          <input
            placeholder="Username"
            type="text"
            className="form-input"
            {...register("username", {
              required: true,
              minLength: 5,
              maxLength: 10,
            })}
          />
          {errors.username && (
            <span className="form-error">Username must be 5–10 characters</span>
          )}
        </div>

        <div className="form-group">
          <input
            placeholder="Email"
            type="email"
            className="form-input"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="form-error">Email is required</span>}
        </div>

        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            className="form-input"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 12,
              pattern: /^(?=.*[!@#$%^&*])/,
            })}
          />
          {errors.password && (
            <span className="form-error">
              Password must be 8–12 characters and include a special character
            </span>
          )}
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Signup"}
          </button>
        </div>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
export default Signup