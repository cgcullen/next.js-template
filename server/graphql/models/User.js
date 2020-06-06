const BaseModel = require("./BaseModel")
const bcrypt = require("bcryptjs")
const { knex } = require("../../database")
const { transporter } = require("../../email")
const moment = require("moment")

class User extends BaseModel {
  constructor() {
    super("User")
  }

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
    if (!user[0]) throw new Error("A User with that Email does not exist")
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
    debugger
    if (ctx.isAuthenticated()) {
      return ctx.getUser()
    }

    return null
  }

  makeToken(length) {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  async forgotPassword(email) {
    const user = await this.findByEmail(email)

    if (user) {
      const token = this.makeToken(24)
      const expires = moment().add(2, "hours").format()

      await knex("users").where("email", email).update({ token, expires })
      const mailOptions = {
        from: "tech@cullenws.com",
        to: email,
        subject: "Reset your password",
        text: `Use this link to reset your password: ${process.env.DOMAIN}/reset-password/${token}`,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log("Email sent: " + info.response)
        }
      })

      return user.id
    } else {
      throw new Error("Email not found")
    }
  }

  async resetPassword(resetPasswordData) {
    const { newPassword, newPasswordConfirmation, token } = resetPasswordData
    // check for token
    const users = await knex("users")
      .select("id", "password", "expires")
      .where("token", token)
    const user = users[0]
    if (!user) throw new Error("Invalid link")

    const current = moment().format()
    const expires = moment(user.expires).format()
    if (current > expires) throw new Error("Link has expired")

    if (newPassword !== newPasswordConfirmation)
      throw new Error("Passwords do not match")

    // hash and save new password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(newPassword, salt)
    const updatedUser = await knex("users")
      .where("id", user.id)
      .update({ password: hash })
    return updatedUser[0]
  }

  async getUsers() {
    const users = await knex("users").select(
      "id",
      "firstname",
      "lastname",
      "role",
      "email"
    )
    return users
  }

  async changeRole(id, role) {
    await knex("users").where("id", id).update({ role: role })
    return { id, role }
  }

  async deleteUser(id) {
    await knex("users").where("id", id).del()
    return id
  }
}

module.exports = User
