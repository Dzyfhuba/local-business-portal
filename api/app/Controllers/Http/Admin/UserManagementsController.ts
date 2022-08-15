// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class UserManagementsController {
  public async index ({response}) {
    try {
      const users = await Database.from('users')
        .join('user_has_roles', 'user_has_roles.user_id', 'users.id')
        .join('roles', 'roles.id', 'user_has_roles.role_id')
        .whereNot('role', 'superadmin')
        .select([
          'users.username',
          'users.name',
          'roles.role',
          'users.id',
          'users.updated_at',
          'users.suspend_end',
        ])

      const usersRemoveExpiredSuspend = users.map(user => {
        const remainingSuspension = new Date(user.suspend_end - Date.now())
        return {
          ...user,
          remaining_suspension: remainingSuspension.getTime(),
        }
      })

      return response.json({
        error: false,
        status: 'success',
        data: usersRemoveExpiredSuspend,
      })
    } catch (error) {
      return response.status(400).json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }
}
