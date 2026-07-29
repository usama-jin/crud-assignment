import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.get('/',() =>{
  return "Welcome"
})


// User Register
router.post('/users', [UsersController, 'store'])
router.put('/users/:id', [UsersController, 'update'])
router.patch('/users/:id', [UsersController, 'patch'])
router.delete('/users/:id', [UsersController, 'destroy'])
router.get('/users', [UsersController, 'index'])