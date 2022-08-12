import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import slugify from 'slugify'
import { DateTime } from 'luxon'

export default Factory.define(Post, ({ faker }) => {
  const title = faker.commerce.productName() + ' ' + faker.date.past(2).getTime()
  return {
    user_id: Math.floor(Math.random() * 102 + 1),
    title: title,
    slug: slugify(title),
    images: 'hafidz21ub0,hafidz21ub1,hafidz21ub2,hafidz21ub3,hafidz21ub4,hafidz21ub5',
    visible: faker.datatype.boolean(),
    content: faker.lorem.paragraphs(10),
    approvedAt: faker.datatype.boolean() ? DateTime.now() : null,
  }
}).build()

