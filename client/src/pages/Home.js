import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import { QUERY_REQUESTS } from "../utils/queries";
import RequestList from "../components/RequestList";
import RequestForm from "../components/RequestForm";

const Home = () => {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  const isAuthenticated = AuthService.loggedIn();

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
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">{loading ? <div>Loading...</div> : <RequestList requests={requests} />}</div>
      </div>
      {isAuthenticated && <button onClick={handleOpenForm}>Add Request</button>}
      <RequestForm show={showForm} handleClose={handleCloseForm} handleSubmit={handleFormSubmit} />
    </main>
  );
};

export default Home;
