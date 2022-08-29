// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import shuffleArray from '../Helper/shuffleArray'
export default class PostsController {
  public async index ({response}) {
    try {
      const posts = await Database.from('posts')
        .join('users', 'users.id', 'posts.user_id')
        .join('profiles', 'profiles.user_id', 'users.id')
        .whereNotNull('approved_at')
        .select('posts.id')
        .select('posts.title')
        .select('posts.slug')
        .select('posts.images')
        .select('posts.updated_at')
        .select('users.name')
        .select('users.username')
        .select('profiles.address')
        .orderBy('posts.updated_at', 'desc')
      return response.send({
        error: false,
        status: 'success',
        data: posts,
      })
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async few ({request, response}) {
    try {
      const ids = await Database.from('posts')
        .join('users', 'users.id', 'posts.user_id')
        .join('profiles', 'profiles.user_id', 'users.id')
        .whereNotNull('approved_at')
        .select('posts.id')

      const idsMapped = ids.map(ids => ids.id)
      const selectedId = shuffleArray(idsMapped).slice(0, 10) || idsMapped

      const posts = await Database.from('posts')
        .join('users', 'users.id', 'posts.user_id')
        .join('profiles', 'profiles.user_id', 'users.id')
        .whereNotNull('approved_at')
        .whereIn('posts.id', selectedId)
        .select('posts.id')
        .select('posts.title')
        .select('posts.slug')
        .select('posts.images')
        .select('posts.updated_at')
        .select('users.name')
        .select('users.username')
        .select('profiles.address')

      return response.json({
        error: false,
        status: 'success',
        data: shuffleArray(posts),
      })
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }
}
