import React, { useEffect } from 'react';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer'; // Import the Footer component
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    sections.forEach(section => observer.observe(section));

    return () => {
      if (sections) {
        sections.forEach(section => observer.unobserve(section));
      }
    };
  }, []);

  return (
    <div className="home-container">
      <div className="welcome-side-container">
        <div className="welcome-section">
          <h1>Welcome to TaskMaster</h1>
          <p className="intro-text">Manage your tasks, track your time, and collaborate with your team efficiently.</p>
          <button onClick={handleGetStartedClick} className="get-started-button">Get Started</button>
        </div>
        <div className="info-grid">
          <Link to="task-management" smooth={true} duration={500} className="info-item">
            <h2>Task Management</h2>
            <p>Organize and prioritize your tasks to boost productivity.</p>
          </Link>
          <Link to="time-tracking" smooth={true} duration={500} className="info-item">
            <h2>Time Tracking</h2>
            <p>Track the time spent on each task and improve time management.</p>
          </Link>
          <Link to="progress-monitoring" smooth={true} duration={500} className="info-item">
            <h2>Progress Monitoring</h2>
            <p>Monitor the progress of your tasks with visual progress bars.</p>
          </Link>
          <Link to="collaboration" smooth={true} duration={500} className="info-item">
            <h2>Collaboration</h2>
            <p>Collaborate with your team and share tasks for better teamwork.</p>
          </Link>
        </div>
      </div>

      <div id="task-management" className="section">
        <div className="section-content">
          <div className="section-image"></div>
          <div className="section-text">
            <h2>Task Management</h2>
            <p>Organize and prioritize your tasks to boost productivity. Learn how to effectively manage tasks and increase your workflow efficiency.</p>
          </div>
        </div>
      </div>
      
      <div id="time-tracking" className="section reverse">
        <div className="section-content">
          <div className="section-image"></div>
          <div className="section-text">
            <h2>Time Tracking</h2>
            <p>Track the time spent on each task and improve time management. Discover methods and tools to monitor your time effectively.</p>
          </div>
        </div>
      </div>
      
      <div id="progress-monitoring" className="section">
        <div className="section-content">
          <div className="section-image"></div>
          <div className="section-text">
            <h2>Progress Monitoring</h2>
            <p>Monitor the progress of your tasks with visual progress bars. See how tracking progress can help you stay on top of your goals.</p>
          </div>
        </div>
      </div>
      
      <div id="collaboration" className="section reverse">
        <div className="section-content">
          <div className="section-image"></div>
          <div className="section-text">
            <h2>Collaboration</h2>
            <p>Collaborate with your team and share tasks for better teamwork. Learn strategies to enhance collaboration and communication.</p>
          </div>
        </div>
      </div>

      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default Home;
