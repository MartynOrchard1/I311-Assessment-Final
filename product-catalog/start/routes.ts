/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/debug/hash', async () => {
  const hash = '$scrypt$n=16384,r=8,p=1$AbqS67SwDubrL91drk9P3g$0V22hE+r/VhbQ8JuNDl0sNwFOlqLXWs8UVc1+qHGn7+MCcs8X/P8deDamNkyGtFC++qDlZdOzNx7bry0/Pj7hQ'
  const password = 'password123'

  const hashService = (await import('@adonisjs/core/services/hash')).default
  const result = await hashService.verify(hash, password)

  return { valid: result }
})


router.on('/').render('pages/home')

router.get('/login', [() => import('#controllers/auth_controller'), 'showLogin'])
router.post('/login', [() => import('#controllers/auth_controller'), 'login'])
router.get('/logout', [() => import('#controllers/auth_controller'), 'logout'])
