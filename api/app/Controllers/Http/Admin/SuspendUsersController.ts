// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class SuspendUsersController {
  public async store ({request, response}) {
    try {
      const {username, suspend} = request.body()
      const user = await User.query().where('username', username).firstOrFail()
      user.suspend_end = DateTime.fromISO(suspend)
      await user.save()
      return response.status(201).json({
        error: false,
        status: 'success',
        data: user,
        suspend,
      })
    } catch (error) {
      return response.json({
        error: true,
        status: 'error',
        data: error,
      })
    }
  }

  public async destroy ({request, response}) {
    try {
      const {id} = request.params()

      const user = await User.findOrFail(id)
      user.suspend_end = DateTime.now()
      await user.save()

      return response.json({
        error: false,
        status: 'success',
        data: user,
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
