import { gql } from '@apollo/client';

export const DEPARTMENT = gql`
query Departments{
  departments {
    departments {
      id
      name
      description
    }
  }
}
`;

export const DEPARTMENT_LIST = gql`
query Departments {
  departments {
    id
    name
  }
}
`;