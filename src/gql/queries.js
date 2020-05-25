import { gql } from 'apollo-boost'
export const GET_DATA = gql`
    query getData {
      data {
        done
        id
        text
      }
    }
`