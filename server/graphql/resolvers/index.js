exports.helloQueries = {
  hello: (root, { id }, { models }) => {
    return { id, hello: `Hello ${id}!` }
  },
}

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx)
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
}
