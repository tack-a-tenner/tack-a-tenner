import React from "react";
import { Link } from "react-router-dom";

const RequestList = ({ requests, profiles }) => {
  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-dark">Some recent requests...</h3>
      <div id="cardCatalog">
        {requests &&
          requests.map((request) => (
            <div key={request._id} className="cardStock" id="requestCard">
              <div>
                <h4>
                  {request.requestTitle} <br />
                </h4>
                {/* <Link className="btn btn-block btn-squared btn-light text-dark" to={`/requests/${request._id}`}>
                  View and endorse their skills.
                </Link> */}
                <div>
                  <p>{/* Requested by: <Link to={`/profiles/${request.requestAuthor._id}`}>{request.requestAuthor.name}</Link> */}</p>
                  <p>"{request.description}"</p>
                  <p>{/* {request.requestAuthor.name.split(" ").shift()} is offering ${request.price} */}</p>
                  <p>Requested on {request.createdAt}</p>
                  {request.expirationDate !== "" ? <p>Expiration Date: {request.expirationDate}</p> : <p>No expiration date</p>}
                  {/* <a href={`mailto:${request.requestAuthor.email}`}>Contact</a> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestList;


