import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';
import '../styles/Navigation/Navigation.css';
import NavData from '../helpers/NavData';

const Navigation = ({ loggedInStatus, handleLogout, user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [lower, setLower] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 10) {
        setLower(true);
      } else {
        setLower(false);
      }
    });
  }, []);

  const handleSidebar = () => setSidebar(!sidebar);

  const history = useHistory();

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(() => {
        handleLogout();
        handleSidebar();
        history.push('/');
      });
  };

  const isLoggedIn = () => {
    if (loggedInStatus) {
      return (
        <>
          <p>{user.username}</p>
          <Link to="/logout" onClick={handleClick}>Logout</Link>
        </>
      );
    }

    return (
      <>
        <Link to="/login" onClick={handleSidebar}>Log In</Link>
        <Link to="/signup" onClick={handleSidebar}>Sign Up</Link>
      </>
    );
  };

  return (
    <nav>
      <div className="menu-info">
        <div className={`hamburger w-100 d-flex justify-content-end position-fixed ${lower ? 'white-bg' : ''}`}>
          <button type="button" className="open-icon open-close" onClick={handleSidebar}>
            <FaIcons.FaBars />
          </button>
        </div>

        <div className={sidebar ? 'sidebar-cont active position-fixed' : 'sidebar-cont position-fixed'}>
          <ul className="sidebar-items">
            <li className="close-btn d-flex justify-content-end">
              <button type="button" className="close-icon open-close" onClick={handleSidebar}>
                <GrIcons.GrClose />
              </button>
            </li>
            {NavData.map(data => (
              <li key={data.title} className={data.cName}>
                <Link to={data.path} onClick={handleSidebar}>
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex flex-column">
            {isLoggedIn()}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  loggedInStatus: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Navigation;
