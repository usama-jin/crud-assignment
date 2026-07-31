import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../services/userService'

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    country: '',
  })
  const [originalForm, setOriginaForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    country: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const fetchUser = async () => {
    try {
      const response = await getUser(Number(id))

      setForm({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        city: response.data.city,
        province: response.data.province,
        country: response.data.country,
      })
      setOriginaForm({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        city: response.data.city,
        province: response.data.province,
        country: response.data.country,
      })
    } catch (error) {
      console.error(error)
      alert('Failed to load user')
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setErrors({})
if (JSON.stringify(form) === JSON.stringify(originalForm)) {
  alert('No changes detected.')
  return
}
      await updateUser(Number(id), form)

      alert('User updated successfully')
      navigate('/users')
    } catch (error: any) {
  console.error(error)
  console.log('Response:', error.response)
  console.log('Data:', error.response?.data)

  const responseData = error.response?.data

  if (responseData?.errors) {
    const validationErrors: Record<string, string> = {}

    // Handle array format
    if (Array.isArray(responseData.errors)) {
      responseData.errors.forEach((err: any) => {
        validationErrors[err.field] = err.message
      })
    }

    // Handle object format
    else {
      Object.keys(responseData.errors).forEach((key) => {
        validationErrors[key] = Array.isArray(responseData.errors[key])
          ? responseData.errors[key][0]
          : responseData.errors[key]
      })
    }

    setErrors(validationErrors)
    return
  }

  alert(responseData?.message || 'Failed to update user')
}
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">Edit User</h1>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full rounded border p-2"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full rounded border p-2"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded border p-2"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (+92...)"
              className="w-full rounded border p-2"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full rounded border p-2"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded border p-2"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <input
              name="province"
              value={form.province}
              onChange={handleChange}
              placeholder="Province"
              className="w-full rounded border p-2"
            />
            {errors.province && (
              <p className="mt-1 text-sm text-red-500">
                {errors.province}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full rounded border p-2"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country}
              </p>
            )}
          </div>

        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate('/users')}
            className="rounded bg-gray-600 px-5 py-2 text-white hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}