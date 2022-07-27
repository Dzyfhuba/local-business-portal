// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register ({request, response}) {
    const body = await request.validate(RegisterValidator)
    try {
      const user = await User.create(body)
      await user.setRole('stall')

      return response.send({
        error: false,
        status: 'success',
        message: 'User has been registered',
        data: user,
      })
    } catch (error) {
      return response.send({
        error: true,
        status: 'error',
        message: 'Register is failed',
        data: error,
      })
    }
  }
}
