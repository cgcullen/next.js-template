const express = require("express")
const next = require("next")

const { ApolloServer, gql } = require("apollo-server-express")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const port = parseInt(process.env.PORT, 10) || 3000
const handle = app.getRequestHandler()
const { helloQueries } = require("./graphql/resolvers")
const { helloTypes } = require("./graphql/types")

const { knex } = require("./database")

app.prepare().then(() => {
  const server = express()

  const typeDefs = gql`
    ${helloTypes}
  `

  const resolvers = {
    Query: {
      ...helloQueries,
    },
    // Mutation: {
    //   //...helloMutations
    // },
  }

  const apolloServer = new ApolloServer({ typeDefs, resolvers })
  apolloServer.applyMiddleware({ app: server })

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
