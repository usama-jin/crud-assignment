import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../services/userService'

export default function CreateUser() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.ChangeEvent
  ) => {
    e.preventDefault()

    try {
      await createUser(form)

      alert('User created successfully')

      navigate('/users')
    } catch (error) {
      console.error(error)
      alert('Failed to create user')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg bg-white p-8 shadow"
      >

        <h1 className="mb-6 text-3xl font-bold">
          Create User
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="col-span-2 rounded border p-2"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="province"
            placeholder="Province"
            value={form.province}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="col-span-2 rounded border p-2"
          />

        </div>

        <div className="mt-6 flex gap-3">

          <button
            type="submit"
            className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Create User
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