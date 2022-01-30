const { gql } = require("@apollo/client");

export const EMPLOYEES = gql`
query Employees {
    employees {
      id
      email
      designation
      departmentId
      department {
        id
        name
        description
      }
    }
  }
  `;