import UserFactory from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(UserFactory, ({ faker }) => {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345678',
  }
}).build()
