import gql from 'graphql-tag';

// test
export const TEST_SERVER = gql`
  query {
    hello
  }
`;

// users
export const M_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(data: {
      email: $email,
      password: $password,
    }) {
      id
      username
      email
      roles
    }
  }
`;

export const Q_CURRENT_USER = gql`
  query {
    currentUser{
      id
      username
      email
      roles
    }
  }
`


// tags

