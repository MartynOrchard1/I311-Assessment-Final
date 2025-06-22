/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// Imports
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


// DEBUG TO SEE IF HASHING IS WORKING
// Uncomment the following lines to test password hashing and verification result should be true

// router.get('/debug/hash', async () => {
//   const hash = '$scrypt$n=16384,r=8,p=1$AbqS67SwDubrL91drk9P3g$0V22hE+r/VhbQ8JuNDl0sNwFOlqLXWs8UVc1+qHGn7+MCcs8X/P8deDamNkyGtFC++qDlZdOzNx7bry0/Pj7hQ'
//   const password = 'password123'

//   const hashService = (await import('@adonisjs/core/services/hash')).default
//   const result = await hashService.verify(hash, password)

//   return { valid: result }
// })

// Home Page - DEFAULT ROUTE
router.on('/').render('pages/home')

// Login Routes
router.get('/login', [() => import('#controllers/auth_controller'), 'showLogin'])
router.post('/login', [() => import('#controllers/auth_controller'), 'login'])
router.get('/logout', [() => import('#controllers/auth_controller'), 'logout'])

// Dashboard
router.get('/dashboard', '#controllers/products_controller.index')
  .as('dashboard')
  .use(middleware.auth())

// Create form
router.get('/products/create', '#controllers/products_controller.create')
  .as('products.create')
  .use(middleware.auth())

// Store new product
router.post('/products', '#controllers/products_controller.store')
  .as('products.store')
  .use(middleware.auth())

// Edit form
router.get('/products/:id/edit', '#controllers/products_controller.edit')
  .as('products.edit')
  .use(middleware.auth())

// Update product
router.post('/products/:id', '#controllers/products_controller.update')
  .as('products.update')
  .use(middleware.auth())

// Delete product
router.post('/products/:id/delete', '#controllers/products_controller.destroy')
  .as('products.delete')
  .use(middleware.auth())
