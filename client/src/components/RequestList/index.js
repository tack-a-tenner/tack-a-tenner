import React from "react";
import { Link } from "react-router-dom";

const RequestList = ({ requests }) => {
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
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {request.requestTitle} <br />
                </h4>
                <Link className="btn btn-block btn-squared btn-light text-dark" to={`/requests/${request._id}`}>
                  View and endorse their skills.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestList;
