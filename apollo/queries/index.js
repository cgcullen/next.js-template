import { gql } from "apollo-boost"

export const HELLO = gql`
  query Hello($id: ID) {
    hello(id: $id) {
      hello
    }
  }
`

export const REGISTER = gql`
  mutation Register(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    register(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`
export const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(input: { email: $email, password: $password }) {
      id
      firstname
      lastname
      email
      role
    }
  }
`
export const LOGOUT = gql`
  mutation LogOut {
    logOut
  }
`

export const GET_USER = gql`
  query User {
    user {
      id
      firstname
      lastname
      email
      role
    }
  }
`
