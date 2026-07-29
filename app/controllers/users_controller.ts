import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateUserValidator } from '#validators/update_user'

export default class UsersController {

    // Create User
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'province',
      'country',
    ])

    const user = await User.create(data)

    return response.created({
      message: 'User created successfully',
      data: user,
    })
  }

  // Full record update
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

const data = await request.validateUsing(updateUserValidator)

    user.merge(data)

    await user.save()

    return response.ok({
      message: 'User updated successfully',
      data: user,
    })
  }
   async patch({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    const data = request.only([
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'province',
      'country',
    ])

    user.merge(data)

    await user.save()

    return response.ok({
      message: 'User updated successfully',
      data: user,
    })
  }
}
