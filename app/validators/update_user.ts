import vine from '@vinejs/vine'

export const updateUserValidator = vine.create(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    email: vine.string().email(),
    phone: vine.string(),
    address: vine.string(),
    city: vine.string(),
    province: vine.string(),
    country: vine.string(),
  })
)