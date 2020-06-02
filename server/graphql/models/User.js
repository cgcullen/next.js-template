const bcrypt = require("bcryptjs")
const { knex } = require("../../database")

class User {
  id
  firstname
  lastname
  email
  password
  role

  setUserData(user) {
    this.id = user.id
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.password = user.password
    this.role = user.role
    return
  }

  getUserData() {
    return {
      id: (this.id = user.id),
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role,
    }
  }

  async logIn(logInData, { authenticate }) {
    try {
      const user = await authenticate(logInData)
      this.setUserData(user)
      return user
    } catch (error) {
      return error
    }
  }

  async register(registerData) {
    debugger
    const {
      firstname,
      lastname,
      email,
      password,
      passwordConfirmation,
    } = registerData
    if (!firstname || !lastname || !email || !password || !passwordConfirmation)
      throw new Error("All fields are required")
    const userExists = await knex("users").select("id").where("email", email)
    if (userExists.length > 0)
      throw new Error("This email address already has an account")
    if (password !== passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!")
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    registerData.password = hash
    delete registerData.passwordConfirmation
    const registeredUser = await knex("users").insert(registerData)
    return registeredUser[0]
  }

  logOut(ctx) {
    try {
      ctx.logout()
      return true
    } catch (error) {
      return false
    }
  }

  async findByEmail(email) {
    if (this.email === email) {
      return this.getUserData()
    }
    const user = await knex.from("users").select().where("email", "=", email)
    this.setUserData(user[0])
    return user[0]
  }

  async validatePassword(userPassword, done) {
    if (!this.password) return done("no user password")
    bcrypt.compare(userPassword, this.password, function (error, isSuccess) {
      if (error) return done(error)
      return done(null, isSuccess)
    })
  }

  async findById(id) {
    if (this.id === id) {
      return this.getUserData()
    }
    const user = await knex.from("users").select().where("id", id)
    this.setUserData(user[0])
    return user[0]
  }

  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser()
    }

    return null
  }
}

module.exports = User
