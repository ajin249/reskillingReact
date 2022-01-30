import { gql } from '@apollo/client';
export const USER_SIGN_IN = gql`
  mutation DoLogin($email: String!, $password: String!) {
    doLogin(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      role
      status
      employeeId
      message
      token
    }
  }
`;