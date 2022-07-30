// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

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
}
