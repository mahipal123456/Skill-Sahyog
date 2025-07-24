import React from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {
  const navigate=useNavigate();
  const userData=props.user_data;
  const user=userData.userProfile;
  const isowner=props.isowner;
  

  return (
    <div className="user-card">
      {isowner&&
      (<div className="edit-profile-wrapper">
      <button className="edit-profile-btn" onClick={()=>navigate('/edit-profile')}>Edit Profile</button>
    </div>)}

      <div className="user-header">
        <div className="profile-placeholder">
            {userData.username.charAt(0).toUpperCase()}
          </div>

        <div className="user-info">
          <h2>@{userData.username}</h2>
          <p className="intro">{user.intro}</p>
          <span className="role-tag user">Volunteer</span>
        </div>
      </div>

      <div className="level-tag">{user.level}</div>

      <div className="social-links">
        {Object.entries(user.socialLinks).map(([key, url]) => (
          <a key={key} href={url} target="_blank" rel="noreferrer" className={`social-btn ${key}`}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
      </div>

      <div className="skills">
        {user.topSkills.map((skill, idx) => (
          <span key={idx} className="skill-chip">{skill}</span>
        ))}
      </div>

      <div className="stats-box">
        <div>
          <h3>{user.stats.applied}</h3>
          <p>Applied</p>
        </div>
        <div>
          <h3>{user.stats.completed}</h3>
          <p>Completed</p>
        </div>
        <div>
          <h3>{user.stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div>
          <h3>{user.rating}⭐</h3>
          <p>Rating</p>
        </div>
      </div>

      <div className="badges-section">
        <h4>Achievements</h4>
        <div className="badges">
          {user.badges.map((badge, idx) => (
            <span key={idx} className="badge">{badge}</span>
          ))}
        </div>
      </div>

      <div className="completed-projects">
        <h4>Completed Projects</h4>
        <ul>
          {user.completedProjects.map((proj) => (
            <li key={proj.id} className="project">
              <strong>{proj.title}</strong>
              <br />
              <small>by {proj.ngoName}</small>
              <br />
              <em>Completed on: {proj.completedDate}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
