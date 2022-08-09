// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'

// import Post from 'App/Models/Post'

export default class PostsController {
  public async allByStall ({ auth, response }) {
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

  public async get ({ request, response }) {
    try {
      const { slug } = request.params()

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

  public async store ({ request, response, auth }) {
    try {
      await auth.use('api').authenticate()

      if (auth.use('api').user!) {
        const body = request.body()
        body.user_id = auth.use('api').user.id
        body.slug = body.title

        const post = await Post.create(body)

        return response.status(201).json({
          error: false,
          status: 'success',
          data: post,
          request: request,
        })
      }F
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        data: error,
        body: request.body(),
      })
    }
  }

  public async destroy ({request, response}) {
    try {
      const { id } = request.params()

      const data = await (await Post.findOrFail(id)).delete()

      return response.status(201).json({
        error: false,
        status: 'success',
        data,
        request: request.params(),
      })
    } catch (error) {
      return response.status(400).json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async edit ({request, response}) {
    try {
      const {id} = request.params()
      const post = await Post.findOrFail(id)

      return response.json({
        error: false,
        status: 'success',
        data: post,
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
