const { keysToCamel } = require("../../utils/keysToCamel")
debugger
const options = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  postProcessResponse: (result, queryContext) => {
    return keysToCamel(result)
  },
}

console.log(`using database: ${process.env.DB_DATABASE}`)

exports.knex = require("knex")(options)
