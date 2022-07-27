// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {
  public async register ({request, response}) {
    const user = await User.find(1)
    console.log(request.body())
    try {
      return response.send({
        error: false,
        status: 'succces',
        message: 'User has been registered',
        // data: user?.getRole(),
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
