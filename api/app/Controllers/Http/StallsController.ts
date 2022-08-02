// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class StallsController {
  public async index ({ response }) {
    try {
      const stalls = await Database.from('users')
        .join('profiles', 'profiles.user_id', 'users.id')
        .join('user_has_roles', 'user_has_roles.user_id', 'users.id')
        .join('roles', 'roles.id', 'user_has_roles.role_id')
        .where('roles.role', 'stall')
        .select('users.id')
        .select('users.username')
        .select('users.name')
        .select('profiles.profile')
        .select('profiles.address')

      return response.send({
        error: false,
        status: 'success',
        data: stalls,
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
