// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register ({request, response}) {
    const body = await request.validate(RegisterValidator)
    try {
      const user = await User.create(body)
      await user.setRole('stall')

      const profile = await Profile.create({
        user_id: user.id,
      })

      return response.send({
        error: false,
        status: 'success',
        message: 'User has been registered',
        data: {
          user,
          profile,
        },
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

      const user4 = await User.find(auth.use('api').user.id)
      const role = await user4?.getRole()

      let user4Response = user4?.serializeAttributes()
      user4Response = {
        ...user4Response,
        role,
      }

      return response.send({
        error: false,
        status: 'success',
        message: 'Login has successfully',
        user: user4Response,
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

  public async logout ({auth, response}) {
    await auth.use('api').revoke()
    return response.send({
      error: false,
      status: 'success',
      message: 'Logout has successfully',
    })
  }

  public async authCheck ({auth, response}) {
    try {
      await auth.use('api').authenticate()

      if (auth.use('api').user!) {
        const user = await User.find(auth.use('api').user.id)
        const role = await user?.getRole()

        let user4Response = user?.serializeAttributes()
        user4Response = {
          ...user4Response,
          role,
        }

        return response.send({
          error: false,
          status: 'success',
          message: 'You have logged in',
          user: user4Response,
        })
      }

      return response.send({
        status: 'error',
        error: true,
        message: 'You are not logged in',
      })
    } catch (e) {
      return response.send({
        status: 'error',
        error: true,
        message: 'Somethings bad is happen',
        e ,
      })
    }
  }
}
