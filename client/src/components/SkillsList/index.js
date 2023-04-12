import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_SKILL } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { UPDATE_REQUEST } from "../../utils/mutations";
import RequestForm from "../RequestForm";

const SkillsList = ({ requests, isLoggedInUser = false }) => {
  // const [removeSkill, { error }] = useMutation(REMOVE_SKILL, {
  //   update(cache, { data: { removeSkill } }) {
  //     try {
  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: { me: removeSkill },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });

  // const handleRemoveSkill = async (skill) => {
  //   try {
  //     const { data } = await removeSkill({
  //       variables: { skill },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const { loading, data } = useQuery(UPDATE_REQUEST);
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-dark">Your recent requests...</h3>
      <div id="cardCatalog">
        {requests &&
          requests.map((request) => (
            <div key={request._id} onClick={handleOpenForm} className="cardStock" id="requestCard">
              <RequestForm showForm={showForm} handleCloseForm={handleCloseForm} />
              <div>
                <h4>
                  {request.requestTitle} <br />
                </h4>

                <div>
                  <p>"{request.description}"</p>
                  <p>Requested on {request.createdAt}</p>
                  {request.expirationDate !== "undefined NaNth, NaN" ? <p>Expiration Date: {request.expirationDate}</p> : <p>No expiration date</p>}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>} */}
    </div>
  );
};

export default SkillsList;
