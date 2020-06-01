const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const { knex } = require("../../database")
const fixtures = require("./fixtures")
const User = require("../../graphql/models/User")

const clean = async (knex) => {
  console.log("cleaning tables...")
  await knex("users").truncate()
}

const populate = async (knex) => {
  console.log("populating tables from fixtures...")
  const user = new User(knex)
  const us = fixtures.users.map(async (u) => await user.register(u))
  Promise.all(us).then(() => {
    process.exit()
  })
}

const seed = async (knex) => {
  await clean(knex)
  await populate(knex)
}
seed(knex)
