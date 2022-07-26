// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class ProfilesController {
  public async get ({request, response}) {
    const {stall} = request.params()

    try {
      const profile = await Database.from('profiles')
        .join('users', 'users.id', 'profiles.user_id')
        .where('users.username', stall)
        .select('users.username')
        .select('users.name')
        .select('profiles.*')
        .firstOrFail()

      return response.send({
        error: false,
        status: 'success',
        data: profile,
        stall,
      })
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        data: error,
        stall,
      })
    }
  }

  /**
   * update
   */
  public async update ({request, auth, response}) {
    try {
      await auth.use('api').authenticate()
      const userId = auth.use('api').user.id
      const {
        address,
        phone,
        description,
        name,
        profile,
      } = request.body()

      const profile1 = await Profile.updateOrCreate({user_id: userId}, {
        address,
        phone,
        description,
        profile,
      })
      const user = await User.findOrFail(userId)
      user.name = name
      user.save()

      return response.send({
        error: false,
        status: 'success',
        data: profile1,
      })
    } catch (error) {
      return response.send({
        error: 'true',
        status: 'error',
        data: error,
      })
    }
  }

  public async image ({auth, response}) {
    try {
      await auth.use('api').authenticate()

      if (auth.use('api').user!) {
        const profile = await Database.from('profiles')
          .where('user_id', auth.use('api').user.id)
          .select('profile')
          .first()

        return response.send({
          error: false,
          status: 'success',
          data: profile,
        })
      }
      return response.send({
        error: true,
        status: 'error',
        data: {
          not: 'found',
        },
      })
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }
}
