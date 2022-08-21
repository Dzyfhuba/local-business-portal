// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'
import { DateTime } from 'luxon'

export default class PostApprovalsController {
  public async unapproved ({response}) {
    try {
      const posts = await Database.from('posts')
        .whereNull('approved_at')
        .join('users', 'users.id', 'posts.user_id')
        .select([
          'posts.id',
          'posts.title',
          'posts.slug',
          'users.username',
          'posts.updated_at',
        ])

      return response.json({
        error: false,
        status: 'success',
        data: posts,
      })
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async approve ({request, response}) {
    try {
      const {id} = request.body()

      const post = await Post.findOrFail(id)
      post.approvedAt = DateTime.now()
      await post.save()

      return response.json({
        error: false,
        status: 'success',
        data: post,
      })
    } catch (error) {
      return response.status(500).json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }
}
