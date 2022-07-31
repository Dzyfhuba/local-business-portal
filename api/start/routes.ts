/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.get('/auth/check', 'AuthController.authCheck')

Route.get('/post', 'PostsController.index')

Route.get('/post/all-by-stall', 'Control/PostsController.allByStall')
Route.get('/post/:stall/:slug', 'Control/PostsController.get')

Route.get('/control/:stall/profile', 'Control/ProfilesController.get')
Route.put('/control/:stall/profile', 'Control/ProfilesController.update')
