const { keysToCamel } = require("../../utils/keysToCamel")
const session = require("express-session")
var KnexSessionStore = require("connect-session-knex")(session)

const options = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
  },
  postProcessResponse: (result, queryContext) => {
    return keysToCamel(result)
  },
}

console.log(`using database: ${process.env.DB_DATABASE}`)

const knex = require("knex")(options)

const initSessionStore = () => {
  const store = new KnexSessionStore({ knex })
  return store
}

module.exports = { knex, initSessionStore }
