const session = require("express-session")
const { initSessionStore } = require("../database")
const passport = require("passport")

exports.init = (server) => {
  require("./passport").init(passport)

  const sess = {
    name: "app-session",
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: parseInt(process.env.SESSION_LENGTH) },
    resave: false,
    saveUninitialized: false,
    store: initSessionStore(),
  }
  server.use(session(sess))
  server.use(passport.initialize())
  server.use(passport.session())
}
