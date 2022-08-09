import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import slugify from 'slugify'

export default Factory.define(Post, ({ faker }) => {
  const title = faker.unique(faker.commerce.productName)
  return {
    user_id: Math.floor(Math.random() * 12 + 1),
    title: title,
    slug: slugify(title),
    images: 'hafidz21ub0,hafidz21ub1,hafidz21ub2,hafidz21ub3,hafidz21ub4,hafidz21ub5',
    content: faker.lorem.paragraphs(10),
  }
}).build()
