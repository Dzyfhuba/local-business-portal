import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Post, ({ faker }) => {
  return {
    user_id: Math.floor(Math.random() * 12 + 1),
    title: faker.lorem.words(),
    images: `${faker.image.imageUrl()};${faker.image.imageUrl()};${faker.image.imageUrl()};${faker.image.imageUrl()}`,
    content: faker.lorem.paragraphs(10),
  }
}).build()
