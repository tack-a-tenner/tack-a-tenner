import React from "react";
import { useQuery } from "@apollo/client";

import { QUERY_REQUESTS } from "../utils/queries";
import RequestList from "../components/RequestList";

const Home = () => {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div>{loading ? <div>Loading...</div> : <RequestList requests={requests} />}</div>
      </div>
    </main>
  );
};

export default Home;
