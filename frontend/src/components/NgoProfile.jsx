// NgoProfile.jsx
import React from "react";
import "./NgoProfile.css";
import { useNavigate } from "react-router-dom";

const NgoProfile = (props) => {
  const navigate = useNavigate();
  const isowner=props.isowner;

  // Dummy NGO data matching your schema
  // const ngoData = {
  //   organizationName: "Green Earth Initiative",
  //   mission: "Protecting and restoring the environment for future generations.",
  //   foundedYear: 2010,
  //   website: "https://greenearthngo.org",
  //   address: "123 Eco Park, Green City, Earth",
  //   contactEmail: "contact@greenearthngo.org",
  //   logoURL: "", // leave empty for placeholder
  //   socialLinks: {
  //     facebook: "https://facebook.com/greenearthngo",
  //     linkedin: "https://linkedin.com/company/greenearthngo",
  //     instagram: "https://instagram.com/greenearthngo",
  //   },
  //   postedProjects: [
  //     { id: "p1", title: "Urban Tree Plantation", description: "Planting 10,000 trees in city parks." },
  //     { id: "p2", title: "River Cleanup Drive", description: "Removing plastic waste from the Blue River." },
  //   ],
  // };
  // console.log(props.user_data)
  const ngo=props.user_data;
  const ngoData=props.user_data.ngoProfile;

  return (
    <div className="ngo-card">
      {isowner&&(
      <div className="edit-profile-wrapper">
        <button className="edit-profile-btn" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>
      </div>)
      }
      <div className="ngo-header">
        <div className="profile-placeholder">
          {ngoData.organizationName.charAt(0).toUpperCase()}
           
        </div>
        

        <div className="ngo-info">
          <h2>{ngoData.organizationName}</h2>
          <h3>@{ngo.username}</h3>
          <p className="mission">{ngoData.mission}</p>
          <span className="role-tag ngo">NGO</span>
        </div>
      </div>

      <div className="basic-info">
        <div className="info-row">
          <span className="label">Founded Year:</span>
          <span className="value">{ngoData.foundedYear}</span>
        </div>
        <div className="info-row">
          <span className="label">Website:</span>
          <span className="value">
            <a href={ngoData.website} target="_blank" rel="noreferrer">{ngoData.website}</a>
          </span>
        </div>
        <div className="info-row">
          <span className="label">Address:</span>
          <span className="value">{ngoData.address}</span>
        </div>
        <div className="info-row">
          <span className="label">Contact Email:</span>
          <span className="value">
            <a href={`mailto:${ngoData.contactEmail}`}>{ngoData.contactEmail}</a>
          </span>
        </div>
      </div>

      <div className="social-links">
        {Object.entries(ngoData.socialLinks).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className={`social-btn ${key}`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
      </div>

      <div className="posted-projects">
        <h4>Latest Posted Projects</h4>
        <ul>
          {ngo.latestProjects?.map((proj) => (
            <li key={proj.id} className="project">
              <strong>{proj.title}</strong>
              <br />
              <em>{proj.description}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NgoProfile;
