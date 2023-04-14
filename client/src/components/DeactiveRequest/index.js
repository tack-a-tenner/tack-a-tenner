import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import UpdateRequest from '../UpdateRequest'; // Import the UpdateRequest component

import { REMOVE_SKILL } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const SkillsList = ({ requests, isLoggedInUser = false }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleUpdateRequest = (updatedRequest) => {
    // Perform any additional logic here after successfully updating the request
  };

  const handleEditButtonClick = (request) => {
    setCurrentRequest(request);
    setShowUpdateForm(true);
  };

  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {requests && requests.filter(i => i.isActive === false).map((request) => (
            <div key={request.id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{request.requestTitle}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-info ml-auto"
                      onClick={() => handleEditButtonClick(request)}
                    >
                      Edit
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {showUpdateForm && (
        <UpdateRequest
          show={showUpdateForm}
          handleClose={() => setShowUpdateForm(false)}
          handleSubmit={handleUpdateRequest}
          request={currentRequest}
        />
      )}
    </div>
  );
};

export default SkillsList;