import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'hafidz21ub',
        email: 'hafidz21ub@gmail.com',
        password: '12345678'
      },
      {
        username: 'uba21id',
        email: 'uba21id@gmail.com',
        password: '12345678'
      }
    ])
  }
}
