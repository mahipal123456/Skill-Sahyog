import axios from 'axios';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../contexts/authcontext'; 
import { jwtDecode } from 'jwt-decode';
import './Login.css'
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const { message, setMessage } = useMessage();
    const { setUser, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate()
        const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
        } = useForm();
    async function formSubmit(data){
        try{
        const res= await axios.post(`${BASE_URL}/auth/login`,data);
        
        localStorage.setItem('token',res.data.token)
        const decoded = jwtDecode(res.data.token);
        setUser(decoded);
        setIsLoggedIn(true)
        navigate('/');
        setMessage(res.data.message);
        }
        catch(error){
            const errorMessage = error?.response?.data?.message || "Something went wrong";
            setMessage(errorMessage)
        }
    }
    return (
    <div className="login-container">
      <h2 className="login-title">Login to Your Account</h2>
      <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Email"
            {...register("email", { required: true })}
            type="email"
          />
          {errors.email && <span className="form-error">Email is required</span>}
        </div>

        <div className="form-group">
          <input
            className="form-input"
            placeholder="Password"
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && (
            <span className="form-error">Password is required</span>
          )}
        </div>

        <div className="form-group">
          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </div>
      </form>
      <p className="signup-link">
        Don’t have an account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
}
export default Login