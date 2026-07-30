import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import Admin from '#models/admin'
import { createAdminValidator,  } from '#validators/admin'
import { loginValidator } from '#validators/login'
export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createAdminValidator)

    const existingAdmin = await Admin.findBy('email', payload.email)

    if (existingAdmin) {
      return response.conflict({
        message: 'Email already exists',
      })
    }

    const admin = await Admin.create(payload)

    return response.created({
      message: 'Admin created successfully',
      admin,
    })
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const admin = await Admin.findBy('email', payload.email)

    if (!admin) {
      return response.unauthorized({
        message: 'Invalid email or password',
      })
    }

    const verified = await hash.verify(admin.password, payload.password)

    if (!verified) {
      return response.unauthorized({
        message: 'Invalid email or password',
      })
    }

    const token = await Admin.accessTokens.create(admin)

    return response.ok({
      message: 'Login successful',
      token: token.value!.release(),
      admin,
    })
  }
async logout({ auth, response }: HttpContext) {
  const admin = await auth.use('api').authenticate()

  await Admin.accessTokens.delete(
    admin,
    admin.currentAccessToken.identifier
  )

  return response.ok({
    message: 'Logged out successfully',
  })
}
}