// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import shuffleArray from '../Helper/shuffleArray'

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

  public async few ({response}) {
    try {
      const ids = await Database.from('users')
        .join('profiles', 'profiles.user_id', 'users.id')
        .join('user_has_roles', 'user_has_roles.user_id', 'users.id')
        .join('roles', 'roles.id', 'user_has_roles.role_id')
        .where('roles.role', 'stall')
        .select('users.id')

      const idsMapped = ids.map(ids => ids.id)
      const selectedId = shuffleArray(idsMapped).slice(0, 10) || idsMapped

      const stalls = await Database.from('users')
        .join('profiles', 'profiles.user_id', 'users.id')
        .join('user_has_roles', 'user_has_roles.user_id', 'users.id')
        .join('roles', 'roles.id', 'user_has_roles.role_id')
        .where('roles.role', 'stall')
        .whereIn('users.id', selectedId)
        .select('users.id')
        .select('users.username')
        .select('users.name')
        .select('profiles.profile')
        .select('profiles.address')

      return response.json({
        error: false,
        status: 'success',
        data: shuffleArray(stalls),
      })
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async show ({request, response}) {
    try {
      const {stall} = request.params()

      const result = await Database.from('users')
        .join('profiles', 'profiles.user_id', 'users.id')
        .join('user_has_roles', 'user_has_roles.user_id', 'users.id')
        .join('roles', 'roles.id', 'user_has_roles.role_id')
        .where('roles.role', 'stall')
        .where('users.username', stall)
        .select('users.id')
        .select('users.username')
        .select('users.name')
        .select('profiles.profile')
        .select('profiles.address')
        .select('profiles.phone')
        .select('profiles.description')
        .first()

      const posts = await Database.from('posts')
        .join('users', 'users.id', 'posts.user_id')
        .where('users.username', stall)
        .select('posts.id')
        .select('posts.title')
        .select('posts.images')
        .select('posts.slug')

      return response.send({
        error: false,
        status: 'success',
        data: {
          stall: result,
          posts,
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
