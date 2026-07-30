import vine from '@vinejs/vine'

export const createAdminValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100),

    email: vine.string().trim().email(),

    password: vine.string().minLength(6).maxLength(50),
  })
)