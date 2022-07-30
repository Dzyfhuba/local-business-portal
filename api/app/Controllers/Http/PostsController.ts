// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'

// import Post from 'App/Models/Post'

export default class PostsController {
  public async all ({ auth, response }) {
    try {
      await auth.use('api').authenticate()
      const userId = auth.use('api').user.id

      const posts = await Database.from('posts').where('user_id', '=', userId)
        .join('users', 'users.id', 'posts.user_id')
        .select('posts.*')
        .select('users.username')

      return response.send({
        error: false,
        status: 'success',
        data: posts,
      })
      //   const posts = await Post.query().where('user')
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async get ({request, response}) {
    try {
      const { stall, slug } = request.params()

      const post = await Database.from('posts').where('slug', slug)
        .join('users', 'users.id', 'posts.user_id')
        .select('posts.*')
        .select('users.name').first()

      return response.send({
        error: false,
        status: 'success',
        data: post,
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
