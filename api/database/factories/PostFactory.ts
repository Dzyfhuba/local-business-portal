import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import slugify from 'slugify'

export default Factory.define(Post, ({ faker }) => {
  const title = faker.unique(faker.commerce.productName)
  return {
    user_id: Math.floor(Math.random() * 12 + 1),
    title: title,
    slug: slugify(title),
    images: 'Screenshot (34).png;Screenshot (34).png;Screenshot (34).png;Screenshot (34).png',
    content: faker.lorem.paragraphs(10),
  }
}).build()
