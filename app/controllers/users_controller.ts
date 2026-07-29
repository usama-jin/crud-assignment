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

   async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    await user.delete()

    return response.ok({
      message: 'User deleted successfully',
    })
  }

  async index({ request }: HttpContext) {
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))

    const search = request.input('search', '')
    const sortBy = request.input('sortBy', 'id')
    const order = request.input('order', 'asc')

    const users = await User.query()
      .if(search, (query) => {
        query.where((builder) => {
          builder
            .whereILike('first_name', `%${search}%`)
            .orWhereILike('last_name', `%${search}%`)
            .orWhereILike('email', `%${search}%`)
            .orWhereILike('city', `%${search}%`)
            .orWhereILike('province', `%${search}%`)
            .orWhereILike('country', `%${search}%`)
        })
      })
      .orderBy(sortBy, order)
      .paginate(page, limit)

    return users
  }
}
