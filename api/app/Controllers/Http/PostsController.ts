// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

// import Post from 'App/Models/Post'

export default class PostsController {
  public async all ({ auth, response }) {
    try {
      await auth.use('api').authenticate()
      const userId = auth.use('api').user.id

      const posts = await Post.query().where('user_id', '=', userId)

      return response.send({
        posts,
      })
      //   const posts = await Post.query().where('user')
    } catch (error) {
      return response.send({
        error,
      })
    }
  }

  public async get ({request, response}) {
    try {
      const { stall, slug } = request.params()

      return response.send({
        error: false,
        status: 'success',
        data: 'data',
        stall,
        slug,
      })
    } catch (error) {

    }
  }
}
