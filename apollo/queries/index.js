import { gql } from "apollo-boost"

export const HELLO = gql`
  query Hello($id: ID) {
    hello(id: $id)
  }
`
