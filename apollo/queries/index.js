import { gql } from "apollo-boost"
import users from "../../pages/users"

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
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $newPassword: String!
    $newPasswordConfirmation: String!
    $token: String!
  ) {
    resetPassword(
      input: {
        newPassword: $newPassword
        newPasswordConfirmation: $newPasswordConfirmation
        token: $token
      }
    )
  }
`
export const GET_USERS = gql`
  query Users {
    users {
      id
      firstname
      lastname
      email
      role
    }
  }
`
export const CHANGE_ROLE = gql`
  mutation ChangeRole($id: ID!, $role: String!) {
    changeRole(id: $id, role: $role) {
      id
      role
    }
  }
`
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`
