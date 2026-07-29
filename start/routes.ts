import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.get('/',() =>{
  return "Welcome"
})
router.post('/users', [UsersController, 'store'])