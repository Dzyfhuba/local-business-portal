import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PostFactory from 'Database/factories/PostFactory'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const users = await UserFactory.createMany(100)
    users.forEach(async user => {
      await user.setRole('stall')
    })

    await PostFactory.createMany(10000)
  }
}
