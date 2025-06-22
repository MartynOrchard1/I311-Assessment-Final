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
// router.on('/').render('pages/home')

router.get('/', [() => import('#controllers/products_controller'), 'index']).as('home')
router.get('/products/:id', '#controllers/products_controller.show').as('products.show')



// Login Routes
router.get('/login', '#controllers/auth_controller.showLogin')
  .as('login.show')
router.post('/login', '#controllers/auth_controller.login')
  .as('login')
router.post('/logout', '#controllers/auth_controller.logout')
  .as('logout')
  
// Product routes - all protected
router
  .group(() => {
    router.get('/dashboard', '#controllers/products_controller.dashboard').as('dashboard') // Dashboard route
    router.get('/products/create', '#controllers/products_controller.create').as('products.create') // Create product form
    router.post('/products', '#controllers/products_controller.store').as('products.store') // Store new product
    router.get('/products/:id/edit', '#controllers/products_controller.edit').as('products.edit') // Edit product form
    router.post('/products/:id', '#controllers/products_controller.update').as('products.update') // Update product
    router.post('/products/:id/delete', '#controllers/products_controller.destroy').as('products.delete') // Delete product
  })
  .use(middleware.auth())
