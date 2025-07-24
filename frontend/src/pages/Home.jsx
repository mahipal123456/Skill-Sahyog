import React from 'react';
import './Home.css';
import heroimg from '../assets/hero-image.jpg'
import goalimg from '../assets/goals.jpg'
import {useNavigate} from 'react-router-dom'
const testimonials = [
  {
    username: 'mahipal',
    text: "Thanks to this platform, I contributed to 3 NGO projects and gained real-world experience!",
    rating: 5,
    role: "BTech Student"
  },
  {
    username: 'smilefoundation',
    text: "We found amazing volunteers to help us build our website and reach more people.",
    rating: 4,
    role: "NGO"
  },
  {
    username: 'anita',
    text: "SkillSahyog helped me find a project that perfectly matched my skills and passion.",
    rating: 5,
    role: "Volunteer"
  }
];

const projects = [
  {
    title: "Website Redesign for Smile Foundation",
    ngo: "Smile Foundation",
    description: "Help redesign our NGO website for better outreach.",
    status: "Completed"
  },
  {
    title: "Social Media Campaign for Clean Water",
    ngo: "Clean Water Initiative",
    description: "Create impactful social media content to raise awareness.",
    status: "Completed"
  },
  {
    title: "Mobile App Development for Food Bank",
    ngo: "City Food Bank",
    description: "Build an app to help track food donations and volunteers.",
    status: "Completed"
  }
];

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "300+", label: "Volunteers Joined" },
  { value: "90+", label: "NGOs Connected" }
];

const renderStars = (count) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`star ${i < count ? 'filled' : ''}`}>★</span>
  ));

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="home-container">

      {/* Hero */}

      <section className="hero" id='home'>
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              Empower Change with <span className="highlight">SkillSahyog</span>
            </h1>
            <p>Bridge the gap between talent and need — help NGOs by donating your skills, not money.</p>
            <button onClick={()=>navigate('/signup')}>Start Contributing</button>
            <p className="hero-tagline">Students and professionals across India are making an impact. You can too.</p>
          </div>
          <div className="hero-illustration" aria-hidden="true">
            <div className="illustration-placeholder">
              <img src={heroimg} alt="Volunteers working with NGOs" />
            </div>
          </div>
        </div>
      </section>




      {/* About */}
     <section className="about" id="about">
  <div className="about-wrapper">
    <div className="about-image">
      <img src={goalimg} alt="Our mission illustration" />
    </div>
    <div className="about-text">
      <h2>About SkillSahyog</h2>
      <p>
        SkillSahyog is a platform that connects students and professionals with NGOs,
        enabling them to contribute their skills instead of money to meaningful social projects.
      </p>
      <h2>Our Mission</h2>
      <p>We believe in empowering communities through skill-based volunteering.</p>
      <ul>
        <li>✔️ Connect NGOs with skilled volunteers</li>
        <li>✔️ Enable practical learning and real-world experience</li>
        <li>✔️ Promote social contribution and community impact</li>
      </ul>
    </div>
  </div>
</section>


      {/* Stats */}
      <section className="stats">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-box" key={i}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features">
  <h2>Why Choose SkillSahyog?</h2>
  <div className="feature-grid">
    <div className="feature-card">
      <div className="feature-icon">🎯</div>
      <h3>For Volunteers</h3>
      <p>Work on real-world projects, grow your portfolio, and showcase your skills on your resume — while making a real impact.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🌱</div>
      <h3>For NGOs</h3>
      <p>Get expert help from skilled individuals — students and professionals who contribute their time and talent instead of money.</p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🤖</div>
      <h3>Smart Matching</h3>
      <p>Our platform connects the right talent to the right cause — ensuring every project gets the support it truly needs.</p>
    </div>
  </div>
</section>


      {/* Projects */}
      <section className="projects" id='projects'>
        <h2>Latest Projects</h2>
        <div className="project-grid">
          {projects.map((proj, i) => (
            <div className="project-card" key={i}>
              <div className="project-header">
                <div className="ngo-avatar">{proj.ngo[0].toUpperCase()}</div>
                <div className="ngo-name">{proj.ngo}</div>
              </div>
              <h3 className="project-title">{proj.title}</h3>
              <p>{proj.description}</p>
              <span className="status completed">{proj.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-header">
                <div className="testimonial-avatar">{item.username[0].toUpperCase()}</div>
                <div className="testimonial-meta">
                  <div className="testimonial-username">{item.username.toUpperCase()}</div>
                  <div className="testimonial-stars">{renderStars(item.rating)}</div>
                </div>
              </div>
              <p className="testimonial-text">"{item.text}"</p>
              <p className="testimonial-role">– {item.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to create or contribute to a project?</h2>
        <button onClick={()=>navigate('/signup')}>Join Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 SkillSahyog. Built with ❤️ to connect people with purpose.</p>
       
      </footer>

    </div>
  );
};

export default Home;
