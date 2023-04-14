import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import SkillsList from "../components/SkillsList";
import DeactiveRequest from "../components/DeactiveRequest";
import SkillForm from "../components/SkillForm";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(profileId ? QUERY_SINGLE_PROFILE : QUERY_ME, {
    variables: { profileId: profileId },
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return <h4>You need to be logged in to see your profile page. Use the navigation links above to sign up or log in!</h4>;
  }

  return (
    <div>
      <h3 className="text-dark">Your active requests...</h3>
      <div>{profile.requests?.length > 0 && <SkillsList requests={profile.requests} isLoggedInUser={!profileId && true} />}</div>
      <h3 className="text-dark">Past requests...</h3>
      <div>{profile.requests?.length > 0 && <DeactiveRequest requests={profile.requests} isLoggedInUser={!profileId && true} />}</div>
    </div>
  );
};

export default Profile;
