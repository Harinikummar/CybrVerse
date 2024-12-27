import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import logo from '../images/icon/logo1.png';
import searchIcon from '../images/icon/search.png';
import playIcon from '../images/icon/play.png';
import menuIcon from '../images/icon/menu.png';
import svgImage from '../images/icon/svg1.jpg';
import computerCoursesImg from '../images/icon/computer-courses.png';
import brainBoosterImg from '../images/icon/brainbooster.png';
import onlineTutorialsImg from '../images/icon/online-tutorials.png';
import performanceReportImg from '../images/icon/p3.png';
import quizImg from '../images/icon/b1.png';
import supportImg from '../images/icon/help.png';

function Main() {
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    window.location.reload();
  };
  const handledash=()=>{
    navigate('/dashboard');
  }
  React.useEffect(() => {
    $(window).on('scroll', function () {
      if ($(window).scrollTop()) {
        $('nav').addClass('black');
      } else {
        $('nav').removeClass('black');
      }
    });
  }, []);

  const slide = () => {
    // Add functionality for the search icon
  };

  const sideMenu = (action) => {
    const menu = document.getElementById('side-menu');
    if (action === 0) {
      menu.style.width = '250px';
    } else {
      menu.style.width = '0';
    }
  };

  return (
    <div>
      <header id="header">
        <nav>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <ul>
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link to="/course">Courses</Link></li>
            <li><Link to="/quizz">Services</Link></li>
            <li><Link to="/support">Contact</Link></li>
          </ul>
          <div className="srch">
            <input type="text" className="search" placeholder="Search here..." />
            <img src={searchIcon} alt="search" onClick={slide} />
          </div>

          {/* Conditional Rendering for Get Started / User Info */}
          {userName ? (
            <div className="user_info">
              <h2 className="welcome_text">{userName}</h2>
              <div className="profile_container">
                <FontAwesomeIcon
                  icon={faUser}
                  className="profile_icon"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="dropdown_menu">
                    <ul>
                      <li onClick={handledash}>Profile</li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link className="get-started" to="/login">Get Started</Link>
          )}

          <img src={menuIcon} className="menu" onClick={() => sideMenu(0)} alt="menu" />
        </nav>

        <div className="head-container">
          <div className="quote">
            <p>CybrVerse</p>
            <h2>The beautiful thing about learning is that nobody can take it away from you</h2>
            <div className="play">
              <img src={playIcon} alt="play" />
              <span><a href="https://www.youtube.com/watch?v=rz0RL4Xue-A" target="_blank" rel="noreferrer">Watch Now</a></span>
            </div>
          </div>
          <div className="svg-image">
            <img src={svgImage} alt="svg" />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <div className="service-swipe">
        <div className="diffSection" id="services_section">
          <center>
            <p style={{ fontSize: '50px', padding: '100px', paddingBottom: '40px', color: '#fff' }}>
              Services
            </p>
          </center>
        </div>
        <Link to={userName ? "/course" : "/login"}>
  <div className="s-card">
    <img src={computerCoursesImg} alt="Free Online Computer Courses" />
    <p>Free Online Computer Courses</p>
  </div>
</Link>

        <Link to={userName ? "/Quizz" : "/login"}>
          <div className="s-card">
            <img src={brainBoosterImg} alt="Building Concepts for Certifications" />
            <p>Quizzes for Certifications</p>
          </div>
        </Link>

        <Link to={userName ? "/" : "/login"}>
          <div className="s-card">
            <img src={onlineTutorialsImg} alt="Online Video Lectures" />
            <p>Online Video Lectures</p>
          </div>
        </Link>

        <Link to={userName ? "/dashboard" : "/login"}>
          <div className="s-card">
            <img src={performanceReportImg} alt="Performance Report" />
            <p>Performance Report</p>
          </div>
        </Link>

        <Link to={userName ? "/ctf" : "/login"}>
          <div className="s-card">
            <img src={quizImg} alt="Capture The Flag" style={{ width: '150px' }} />
            <p>Capture The Flag</p>
          </div>
        </Link>

        <Link to={userName ? "/support" : "/login"}>
          <div className="s-card">
            <img src={supportImg} alt="24x7 Online Support" />
            <p>24x7 Online Support</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
