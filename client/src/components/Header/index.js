import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { QUERY_REQUESTS } from "../../utils/queries";
import RequestForm from "../../components/RequestForm";
import Dashboard from "../../components/Dashboard";
import Dashboard2 from "../Dashboard2";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { loading, data } = useQuery(QUERY_REQUESTS);

  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (request) => {
    console.log(request);
  };
  return (
    <header className="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn text-lobster" href="#" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll text-lobster" href="/">
              Home
            </a>
          </li>
          {Auth.loggedIn() ? (
            <>

          <li>
          <Link className="text-lobster" to="/me">
                My Profile
              </Link>
          </li>
          <li>
          <Link className="smoothscroll text-lobster" onClick={handleOpenForm}>
                Make A Request
                <RequestForm show={showForm} handleClose={handleCloseForm} handleSubmit={handleFormSubmit} />
              </Link>
          </li>
          <li>
            <a className="text-lobster" id="logout" onClick={logout}>
            Logout
            </a>
          </li>

          </>
          ) : (
            <>
          <li>
            <a className="smoothscroll text-lobster" href="/requestlist">
              Current Requests
            </a>
          </li>
          <li>
            <Dashboard2 className="smoothscroll text-lobster" href="dashboard2">
              Login
            </Dashboard2>
          </li>
          <li>
            <Dashboard className="smoothscroll text-lobster" href="dashboard">
              Signup
            </Dashboard>
          </li>
          </>
          )}
        </ul>
      </nav>

      <div className="banner">
        <h1 className="banner-text">Tack-A-Tenner</h1>
        <p className="banner-text-two"> America's #1 Freelance Website Since 2023</p>
      </div>
     
    </header>
  );
};

export default Header;
