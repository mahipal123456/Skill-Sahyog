import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './Applicants.css'
import { useMessage } from '../contexts/MessageContext'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectApplicants = () => {
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();
  const { projectId } = useParams(); // assumes route: /project/:projectId/applicants
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchApplicants() {
     try {
        const res = await axios.get(`${BASE_URL}/api/project/${projectId}/applicants`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
            setApplicants(res.data.applicants);
            setMessage(res.data.message)
          
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }

    }

    fetchApplicants();
  }, [projectId]);

  if (loading) {
    return <p>Loading applicants...</p>;
  }

  if (applicants.length === 0) {
    return <p>No applicants yet.</p>;
  }


  return (
    <div className="applicants-container">
      <h2 className="applicants-heading">Applicants for Project</h2>
      <ul className="applicants-list">
        {applicants.map((applicant, idx) => (
          <li key={idx} className="applicant-item">
            <div className="avatar">
              {applicant.user.username.charAt(0).toUpperCase()}
            </div>
            <button
              className="username-link"
              onClick={() => navigate(`/profile/${applicant.user.username}`)}
            >
              {applicant.user.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectApplicants;
