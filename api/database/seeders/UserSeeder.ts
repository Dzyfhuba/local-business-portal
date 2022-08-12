import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const admin = await User.create(
      {
        name: 'Hafidz',
        username: 'hafidz21ub',
        email: 'hafidz21ub@gmail.com',
        password: '12345678',
      },
    )
    await admin.setRole('superadmin')

    const stall = await User.create({
      name: 'Ubaidillah',
      username: 'uba21id',
      email: 'uba21id@gmail.com',
      password: '12345678',
    })

    await stall.setRole('stall')
  }
}
