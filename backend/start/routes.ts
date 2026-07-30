import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import UsersController from '#controllers/users_controller'
import AuthController from '#controllers/auth_controller'

router.get('/', () => {
  return 'Welcome'
})

//Auth
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']) // Add later
}).prefix('/auth')


// Users
router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.post('/', [UsersController, 'store'])

    router.get('/:id', [UsersController, 'show'])
    router.put('/:id', [UsersController, 'update'])
    router.patch('/:id', [UsersController, 'patch'])
    router.delete('/:id', [UsersController, 'destroy'])
  })
  .prefix('/users')
  .use(middleware.auth())
  