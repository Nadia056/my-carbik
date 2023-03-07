/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different+
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


//routes for login

Route.post('/login', 'LoginController.login')
Route.post('/logout', 'LoginController.logout')

//register bike to clients 
Route.post('/registerBike', 'VehiclesController.store')

//routes for clients 
Route.post('/clients', 'ClientsController.store')
Route.get('/clients', 'ClientsController.index')
Route.get ('/clients/:id', 'ClientsController.show')
Route.put('/clients/:id', 'ClientsController.update')
Route.delete('clients/:id', 'ClientsController.destroy')
Route.post('/getUser', 'ClientsController.returnUser')

//routes for cars

Route.post('/cars', 'CarsController.store')
Route.get('/cars', 'CarsController.index')
Route.get ('/cars/:id', 'CarsController.show')
Route.put('/cars/:id', 'CarsController.update')
Route.delete('cars/:id', 'CarsController.destroy')

//routes for bikes

Route.post('/bikes', 'BikesController.store')
Route.get('/bikes', 'BikesController.index')
Route.get ('/bikes/:id', 'BikesController.show')
Route.put('/bikes/:id', 'BikesController.update')
Route.delete('bikes/:id', 'BikesController.destroy')


