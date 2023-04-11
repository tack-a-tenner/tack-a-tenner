import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_SKILL } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const SkillsList = ({ requests, isLoggedInUser = false }) => {
  const [removeSkill, { error }] = useMutation(REMOVE_SKILL, {
    update(cache, { data: { removeSkill } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeSkill },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveSkill = async (skill) => {
    try {
      const { data } = await removeSkill({
        variables: { skill },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {requests &&
          requests.map((request) => (
            <div key={request.id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{request.requestTitle}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveSkill(request)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default SkillsList;
