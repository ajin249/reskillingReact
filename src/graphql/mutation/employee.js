import { gql } from '@apollo/client';

export const DELETE_EMPLOYEE = gql`
mutation DeleteEmployee($empID: ID!) {
    deleteEmployee(employeeId: $empID) {
        status
        message
    }
}
`;

export const CREATE_EMPLOYEE = gql`
mutation CreateEmployee($empInput: employeeInput!) {
    createEmployee(employeeInput: $empInput) {
      message
      status
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
mutation UpdateEmployee($empID: ID!, $empInput: employeeInput) {
    updateEmployee(employeeId: $empID, employeeInput: $empInput) {
      message
      status
    }
  }
`;

