import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      status
      msg
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userInput: userInput!) {
    createUser(userInput: $userInput) {
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
