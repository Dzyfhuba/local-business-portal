// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import { DateTime } from 'luxon'

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

      let user:{password: string, suspend_end: any} = {
        password: '',
        suspend_end: null,
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

      const user4:{
        serializeAttributes(),
        getRole(), suspend_end: any
      } = await User.findOrFail(auth.use('api').user.id)
      const role = await user4.getRole()

      const remainingSuspension = user4.suspend_end ? new Date(user4.suspend_end - Date.now()) : null
      if(remainingSuspension && remainingSuspension.getTime() >= 0) {
        const suspendEnd = DateTime.fromISO(user4.suspend_end)
        const difference = suspendEnd.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])

        return response.status(400).json({
          error: true,
          status: 'error',
          data: {
            suspendEnd,
            difference: difference.toHuman(),
          },
          message: `Akun anda masih ditangguhkan hingga ${difference.toHuman()}` || null,
        })
      }

      let user4Response = user4.serializeAttributes()
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
        let user:any = await User.find(auth.use('api').user.id)
        const role = await user?.getRole()

        const remainingSuspension = user.suspend_end ? new Date(user.suspend_end - Date.now()) : null
        if(remainingSuspension && remainingSuspension.getTime() >= 0) {
          const suspendEnd = DateTime.fromISO(user.suspend_end)
          const difference = suspendEnd.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])

          return response.status(400).json({
            error: true,
            status: 'error',
            data: {
              remainingSuspension,
              difference: difference.toHuman(),
            },
            message: `Akun anda masih ditangguhkan hingga ${difference.toHuman()}` || null,
          })
        }

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
