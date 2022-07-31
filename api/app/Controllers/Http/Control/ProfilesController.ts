// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class ProfilesController {
  public async get ({request, response}) {
    const {stall} = request.params()

    try {
      const profile = await Database.from('profiles').join('users', 'users.id', 'profiles.user_id')
        .where('username', stall)
        .select('users.username')
        .select('users.name')
        .select('profiles.*')
        .first()
      return response.send({
        error: false,
        status: 'success',
        data: profile,
      })
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        data: error,
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
      } = request.body()

      const profile = await Profile.updateOrCreate({user_id: userId}, {
        address,
        phone,
        description,
      })
      const user = await User.findOrFail(userId)
      user.name = name
      user.save()

      return response.send({
        error: false,
        status: 'success',
        data: profile,
      })
    } catch (error) {
      return response.send({
        error: 'true',
        status: 'error',
        data: error,
      })
    }
  }
}
