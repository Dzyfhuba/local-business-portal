import UserFactory from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export default Factory.define(UserFactory, ({ faker }) => {
  return {
    id: undefined,
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345678',
    suspend_end: faker.datatype.boolean() ?
      DateTime.fromJSDate(faker.date.future(faker.datatype.number({min: 7, max: 365})))
      : undefined,
  }
}).build()
