import vine from '@vinejs/vine'

export const createUserValidator = vine.create(
  vine.object({
    firstName: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(50),

    lastName: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(50),

    email: vine
      .string()
      .trim()
      .email()
      .maxLength(100),

    phone: vine
      .string()
      .trim()
      .minLength(10)
      .maxLength(20),

    address: vine
      .string()
      .trim()
      .minLength(5)
      .maxLength(100),

    city: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(50),

    province: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(50),

    country: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(50),
  })
)