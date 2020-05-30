const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const knex = require("../../database")
const fixtures = require("./fixtures")

const clean = async () => {
  console.log("cleaning tables...")
  // await knex()  // delete tables
}

const populate = async () => {
  console.log("populating tables from fixtures...")
  // await knex() // populate from fixtures
}

const seed = async () => {
  await clean()
  await populate()
  process.exit()
}

seed()
