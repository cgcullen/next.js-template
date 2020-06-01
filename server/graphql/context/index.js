const passport = require("passport")

const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => {
    const done = (err, user) => {
      if (err) {
        return reject(new Error(err))
      }

      // save to session
      if (user) {
        req.login(user, (error) => {
          if (error) return reject(new Error(error))
          return resolve(user)
        })
        return resolve(user)
      } else {
        return reject(new Error("Invalid credentials"))
      }
    }

    const authFn = passport.authenticate("graphql", options, done)

    authFn()
  })
}

exports.buildAuthContext = (req) => {
  const auth = {
    authenticate: (options) => authenticateUser(req, options),
    logout: () => req.logout(),
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user,
  }

  return auth
}
