import { gql } from '@apollo/client';

export const CREATE_DEPARTMENT = gql`
mutation createDepartment($departmentInput: departmentInput!) {
  createDepartment(departmentInput: $departmentInput) {
    department {
      id
      name
      description
    }
    message
    status
  }
}
`;

export const UPDATE_DEPARTMENT = gql`
mutation updateDepartment($updateDepartmentId: ID!, $departmentInput: departmentInput) {
  updateDepartment(id: $updateDepartmentId, departmentInput: $departmentInput) {
    department {
      id
      name
      description
    }
    message
    status
  }
}
`;

export const DELETE_DEPARTMENT = gql`
mutation DeleteDepartment($dptID: ID!) {
    deleteDepartment(id: $dptID) {
        status
        message
    }
}
`;

