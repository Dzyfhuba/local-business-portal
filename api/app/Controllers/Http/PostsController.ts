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
}
