/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.get('/login', [() => import('#controllers/auth_controller'), 'showLogin'])
router.post('/login', [() => import('#controllers/auth_controller'), 'login'])
router.get('/logout', [() => import('#controllers/auth_controller'), 'logout'])
