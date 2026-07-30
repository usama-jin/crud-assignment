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
    } catch (error) {
      console.error(error)
      alert('Failed to load user')
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    try {
      await updateUser(Number(id), form)

      alert('User updated successfully')

      navigate('/users')
    } catch (error) {
      console.error(error)
      alert('Failed to update user')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg bg-white p-8 shadow"
      >

        <h1 className="mb-6 text-3xl font-bold">
          Edit User
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="rounded border p-2"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="rounded border p-2"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded border p-2"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="rounded border p-2"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="col-span-2 rounded border p-2"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="rounded border p-2"
          />

          <input
            name="province"
            value={form.province}
            onChange={handleChange}
            placeholder="Province"
            className="rounded border p-2"
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="col-span-2 rounded border p-2"
          />

        </div>

        <div className="mt-6 flex gap-3">

          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate('/users')}
            className="rounded bg-gray-600 px-5 py-2 text-white"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  )
}