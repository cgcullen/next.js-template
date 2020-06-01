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
    }

    type Mutation {
      logIn(input: LogInInput): User
      register(input: RegisterInput): ID
      logOut: Boolean
    }
  `

  const resolvers = {
    Query: {
      ...helloQueries,
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
