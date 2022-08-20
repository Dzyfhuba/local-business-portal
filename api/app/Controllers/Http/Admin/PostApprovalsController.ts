// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class PostApprovalsController {
  public async unapproved ({response}) {
    try {
      const posts = await Database.from('posts')
        .whereNull('approved_at')
        .join('users', 'users.id', 'posts.user_id')

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
}
