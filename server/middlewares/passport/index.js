const GraphqlStrategy = require("./strategies")
const User = require("../../graphql/models/User")

exports.init = async (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = new User()
    const authUser = await user.findById(id)
    if (!authUser) done("No user found", null)
    done(null, authUser)
  })

  await passport.use(
    "graphql",
    new GraphqlStrategy(async ({ email, password }, done) => {
      try {
        authUser = new User()
        user = await authUser.findByEmail(email)
        if (!user) {
          return done(null, false)
        }

        authUser.validatePassword(password, (error, isMatching) => {
          if (error) return done(error)
          if (!isMatching) return done(null, false)

          return done(null, user)
        })
      } catch (error) {
        if (error) {
          return done(error)
        }
      }
    })
  )
}
