import { gql, createClient } from '@urql/core';

const client = createClient({
  url: 'https://graphql.lottiefiles.com/2022-08',
});

const fetchQuery = async (query: any, params) => {
  try {
    const data = await client.query(query, params).toPromise()

    return data;

  } catch (error) {
    return null;
  }
};

const fetchMutation = async (query: any, params) => {
  try {
    const data = await client.mutation(query, params).toPromise()

    return data;

  } catch (error) {
    return null;
  }
};

export { fetchQuery, fetchMutation };
