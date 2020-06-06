exports.helloQueries = {
  hello: (root, { id }, { models }) => {
    return { id, hello: `Hello ${id}!` }
  },
}

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx)
  },
  users: (root, args, { models }) => {
    return models.User.getUsers()
  },
}

exports.userMutations = {
  logIn: (root, { input }, ctx) => {
    return ctx.models.User.logIn(input, ctx)
  },
  register: async (root, { input }, { models }) => {
    const userId = await models.User.register(input)
    return userId
  },
  logOut: (root, args, ctx) => {
    return ctx.models.User.logOut(ctx)
  },
  forgotPassword: (root, { email }, { models }) => {
    return models.User.forgotPassword(email)
  },
  resetPassword: (root, { input }, { models }) => {
    return models.User.resetPassword(input)
  },
  changeRole: (root, { id, role }, { models }) => {
    return models.User.changeRole(id, role)
  },
  deleteUser: (root, { id }, { models }) => {
    return models.User.deleteUser(id)
  },
}
