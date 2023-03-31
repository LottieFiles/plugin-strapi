import { gql } from "@urql/core";

const FeaturedQuery = gql`
  query($first: Int, $after: String, $last: Int, $before: String) {
    featuredPublicAnimations(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          bgColor
          gifUrl
          id
          imageUrl
          lottieUrl
          name
          createdBy {
            avatarUrl
            firstName
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
const RecentQuery = gql`
  query ($first: Int, $after: String, $last: Int, $before: String){
    recentPublicAnimations(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          bgColor
          gifUrl
          id
          imageUrl
          lottieUrl
          name
          createdBy {
            avatarUrl
            firstName
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
const PopularQuery = gql`
  query($first: Int, $after: String, $last: Int, $before: String) {
    popularPublicAnimations(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          bgColor
          gifUrl
          id
          imageUrl
          lottieUrl
          name
          createdBy {
            avatarUrl
            firstName
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

const SearchQuery = gql`
  query($query: String!, $first: Int, $after: String, $last: Int, $before: String){
    searchPublicAnimations(query:$query, first: $first, after: $after, last: $last, before: $before){
      edges {
        node {
          bgColor
          gifUrl
          id
          imageUrl
          lottieUrl
          name
          createdBy {
            avatarUrl
            firstName
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`

const CreateLoginToken = gql`
    mutation ($appKey: String!) {
      createLoginToken(appKey: $appKey) {
        token
        loginUrl
      }
    }
  `

const TokenLogin = gql`
    mutation tokenLogin($token: String!) {
      tokenLogin(token: $token) {
        accessToken
      }
    }
  `

 const Viewer = gql`
    query viewer {
      viewer {
        id
        name
        email
        avatarUrl
        username
      }
    }
  `

export { FeaturedQuery, RecentQuery, PopularQuery, SearchQuery, CreateLoginToken, TokenLogin, Viewer };
