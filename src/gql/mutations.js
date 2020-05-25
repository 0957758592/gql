import { gql } from 'apollo-boost'

export const TOGGLE_DATA = gql`
  mutation toggleData($id: uuid!, $done: Boolean!) {
    update_data(where: {id: {_eq: $id}}, _set: {done: $done}) {
      returning {
        done
        id
        text
      }
    }
  }
`

export const ADD_DATA = gql`
  mutation addData($text: String!) {
    insert_data(objects: {text: $text}) {
      returning {
        text
        id
        done
      }
    }
  }
`
export const DELETE_DATA = gql`
    mutation delete($id: uuid!) {
    delete_data(where: {id: {_eq: $id}}) {
        returning {
            text
            id
            done
        }
    }
    }
`


