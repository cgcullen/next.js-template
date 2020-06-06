const { helloQueries, userMutations, userQueries } = require("./resolvers")
const { helloTypes, userTypes } = require("./types")
const { buildAuthContext } = require("./context")
const { ApolloServer, gql } = require("apollo-server-express")

const { knex } = require("../database")

const User = require("./models/User")

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${helloTypes}
    ${userTypes}

    type Query {
      hello(id: ID): Hello
      user: User
      users: [User]
    }

    type Mutation {
      logIn(input: LogInInput): User
      register(input: RegisterInput): ID
      logOut: Boolean
      forgotPassword(email: String): ID
      resetPassword(input: ResetPasswordInput): ID
      changeRole(id: ID!, role: String!): User
      deleteUser(id: ID!): ID
    }
  `

  const resolvers = {
    Query: {
      ...userQueries,
    },
    Mutation: {
      ...userMutations,
    },
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      settings: {
        "editor.theme": "light",
        "request.credentials": "same-origin",
      },
    },
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        User: new User(),
      },
    }),
  })

  return apolloServer
}
