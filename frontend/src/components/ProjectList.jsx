import React from 'react'
import { Link } from 'react-router-dom';
import './ProjectList.css'
const ProjectList = ({projects}) => {
  return (
    <div className="projects-container">
      <h2 className="section-title">Projects</h2>
      {projects.length > 0 ? (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              <span className="project-title">{project.title}</span>
              <Link to={`/project/${project._id}`}>
                <button className="view-button">View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects to show</p>
      )}
    </div>
  )
}

export default ProjectList