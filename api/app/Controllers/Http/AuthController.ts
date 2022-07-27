// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register ({request, response}) {
    const body = await request.validate(RegisterValidator)
    try {
      const user = await User.create(body)
      await user.setRole('stall')

      return response.send({
        error: false,
        status: 'success',
        message: 'User has been registered',
        data: user,
      })
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        message: 'Register is failed',
        data: error,
      })
    }
  }

  public async login ({auth, request, response}) {
    try {
      await auth.use('api').check()

      if (auth.use('api').isLoggedIn) {
        return response.send({
          error: false,
          status: 'warning',
          message: 'You have logged in',
        })
      }

      const { username, email, password } = request.body()

      let user = {
        password: '',
      }
      if(email){
        user = await User
          .query()
          .where('email', email)
          .firstOrFail()
      }

      if (username) {
        user = await User
          .query()
          .where('username', username)
          .firstOrFail()
      }

      if (!Object.keys(user).length) {
        return response.send({
          error: true,
          status: 'error',
          message: 'Login has failed',
        })
      }
      if (!(await Hash.verify(user.password, password))) {
        return response.send({
          error: true,
          status: 'error',
          message: 'Login has failed',
        })
      }

      const token = await auth.use('api').generate(user)

      return response.send({
        error: false,
        status: 'success',
        message: 'Login has successfully',
        user,
        auth,
        token,
      })
    } catch (e) {
      return response.send({
        error: true,
        status: 'error',
        message: 'Login has failed',
        e,
      })
    }
  }
}
