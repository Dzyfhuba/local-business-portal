// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Role from 'App/Models/Role'
import UserHasRole from 'App/Models/UserHasRole'

export default class UserManagementsController {
  public async index ({response}) {
    try {
      const users = await Database.from('users')
        .join('user_has_roles', 'user_has_roles.user_id', 'users.id')
        .join('roles', 'roles.id', 'user_has_roles.role_id')
        .whereNot('role', 'superadmin')
        .select([
          'users.id',
          'users.username',
          'users.name',
          'roles.role',
          'user_has_roles.role_id',
          'users.id',
          'users.updated_at',
          'users.suspend_end',
        ])

      const mapped = users.map(user => {
        const remainingSuspension = new Date(user.suspend_end - Date.now())
        return {
          ...user,
          remaining_suspension: remainingSuspension.getTime(),
        }
      })

      return response.json({
        error: false,
        status: 'success',
        data: mapped,
      })
    } catch (error) {
      return response.status(400).json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  /**
   * async getRoles
   */
  public async getRoles ({response}) {
    try {
      const roles = await Role.query().select(['id', 'role']).whereNot('role', 'superadmin')

      return response.json({
        error: false,
        status: 'success',
        data: roles,
      })
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async updateRole ({request, response}) {
    try {
      const {id} = request.params()
      const {value} = request.body()
      const userHasRole = await UserHasRole.query().where('user_id', id).firstOrFail()
      userHasRole.role_id = value
      await userHasRole.save()

      return response.json({
        error: false,
        status: 'success',
        data: userHasRole,
      })
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        daa: error,
      })
    }
  }
}
