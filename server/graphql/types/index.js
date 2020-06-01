exports.helloTypes = `
  type Hello {
    id: ID
    hello: String
  }
`

exports.userTypes = `
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    role: String
  }

  input RegisterInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input LogInInput {
    email: String!
    password: String!
  }
`
