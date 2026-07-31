import vine from '@vinejs/vine'

export const createUserValidator = vine.create(
  vine.object({
    firstName: vine.string().alpha().minLength(2).maxLength(50),
    lastName: vine.string().alpha().minLength(2).maxLength(50),

    email: vine
      .string()
      .trim()
      .regex(/^^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/)
      .maxLength(100),

    phone: vine
      .string()
      .trim()
      .minLength(15)
      .maxLength(20)
      .regex(/^\+[1-9]\d{7,14}$/),

    address: vine.string()
      .minLength(10)
      .maxLength(20)
      .regex(/^\+[1-9]\d{7,14}$/),

    city: vine.string().alpha().minLength(2).maxLength(50),

    province: vine.string().trim().alpha().minLength(2).maxLength(50),

    country: vine.string().alpha().trim().minLength(2).maxLength(50),
  })
)
