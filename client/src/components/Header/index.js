import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-gray text-dark mb-4 py-3 display-flex align-center">
          <h1 className="m-0" class="font-lobster" style={{ fontSize: '10rem' }}>
            Tack-A-Tenner
          </h1>
        <p className="m-0" class="font-lobster" style={{ fontSize: '2rem' }}> America's #1 Freelance Website Since 2023</p>
          
      <div className="display-flex justify-space-between-lg justify-center align-center text-center" id="nav-wrap">
        <Link to="/">
        <img src="./assets/images/redTack.png" style={{height:"100px",width: "100px"}} alt="Tack-A-Tenner Logo" className="logo"/>
        </Link>
        <div>
          {Auth.loggedIn() ? (
            <>
            <Link className="text-lobster" to="/request">
              Make A Request
            </Link>
              <Link className="text-lobster" to="/me">
                My Profile
              </Link>
              <span className="text-lobster" id="logout" onClick={logout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link className="text-lobster" to="/login">
                Login
              </Link>
              <Link className="text-lobster" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
