import React from "react";
import { Link } from "react-router-dom";

const RequestList = ({ requests, profiles }) => {
  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">Some recent requests...</h3>
      <div className="flex-row justify-space-between my-4">
        {requests &&
          requests.map((request) => (
            <div key={request._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 text-center">
                  {request.requestTitle} <br />
                </h4>
                {/* <Link className="btn btn-block btn-squared btn-light text-dark" to={`/requests/${request._id}`}>
                  View and endorse their skills.
                </Link> */}
                <div className="card-body bg-light p-2 text-center">
                  <p className="card-text">
                    Requested by: <Link to={`/profiles/${request.requestAuthor._id}`}>{request.requestAuthor.name}</Link>
                  </p>
                  <p className="card-text">"{request.description}"</p>
                  <p className="card-text">
                    {request.requestAuthor.name.split(" ").shift()} is offering ${request.price}
                  </p>
                  <p className="card-text">Requested on {request.createdAt}</p>
                  {request.expirationDate !== "" ? <p className="card-text">Expiration Date: {request.expirationDate}</p> : <p className="card-text">No expiration date</p>}
                  <a href={`mailto:${request.requestAuthor.email}`}>Contact</a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestList;
