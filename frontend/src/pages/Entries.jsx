import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useMessage } from '../contexts/MessageContext';
import './Entries.css';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectEntries = () => {
  const { projectId } = useParams(); // expects route: /project/:projectId/entries
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMessage } = useMessage();
  const navigate=useNavigate();
  useEffect(() => {
    const token=localStorage.getItem('token')
  async function fetchEntries() {
    try {
      const res = await axios.get(`${BASE_URL}/api/project/${projectId}/entries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 && Array.isArray(res.data)) {
        setEntries(res.data);
        if (res.data.length === 0) {
          setMessage("No entries submitted for this project yet.");
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong while fetching entries.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  fetchEntries();
}, [projectId]);

  if (loading) {
    return <p>Loading entries...</p>;
  }

  if (entries.length === 0) {
    return <p>No entries submitted yet.</p>;
  }

  return (
<div className="entries-container">
  <h2 className="entries-heading">Submitted Entries</h2>
  <ul className="entries-list">
    {entries.map((entry, idx) => (
      <li key={idx} className="entry-item">
        <div className="entry-avatar">
          {entry.submittedBy.charAt(0).toUpperCase()}
        </div>
        <div className="entry-details">
          <button
            className="entry-username-link"
            onClick={() => navigate(`/profile/${entry.submittedBy}`)}
          >
            {entry.submittedBy}
          </button>
          <a
            href={entry.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="entry-link"
          >
            View Submission
          </a>
        </div>
      </li>
    ))}
  </ul>
</div>


  );
};

export default ProjectEntries;
