import React, { useState, useEffect } from "react";
import { gql, createClient, Client } from "@urql/core";

const defaultClient = new Client({
  url: "https://graphql.lottiefiles.com/2022-08",
});

export const useUrqlClient = (url) => {
  const [client, setClient] = useState<Client>(defaultClient);

  useEffect(() => {
    const newClient = new Client({ url });
    setClient(newClient);
  }, [url]);

  const fetchQuery = async (query: any, params) => {
    try {
      const data = await client.query(query, params).toPromise();

      return data;
    } catch (error) {
      return null;
    }
  };

  const fetchMutation = async (query: any, params) => {
    try {
      const data = await client.mutation(query, params).toPromise();

      return data;
    } catch (error) {
      return null;
    }
  };

  return { fetchQuery, fetchMutation };
};
