// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class PostsController {
  public async index ({response}) {
    try {
      const posts = await Database.from('posts')
        .join('users', 'users.id', 'posts.user_id')
        .join('profiles', 'profiles.user_id', 'users.id')
        .select('posts.id')
        .select('posts.title')
        .select('posts.slug')
        .select('posts.images')
        .select('posts.updated_at')
        .select('users.name')
        .select('users.username')
        .select('profiles.address')
        .orderBy('id', 'desc')
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
}
