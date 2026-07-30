import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers, deleteUser } from '../services/userService'
import { logout } from '../services/authService'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  country: string
}

type PaginationMeta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
}

export default function Users() {
  const navigate = useNavigate()

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<PaginationMeta | null>(null)

  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [order, setOrder] = useState('asc')

  const fetchUsers = async () => {
    setLoading(true)

    try {
      const response = await getUsers(
        page,
        10,
        search,
        sortBy,
        order
      )

      setUsers(response.data.data)
      setMeta(response.data.meta)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, search, sortBy, order])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this user?')) return

    try {
      await deleteUser(id)
      fetchUsers()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      localStorage.removeItem('token')
      navigate('/')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-7xl rounded-lg bg-white p-6 shadow">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-500">
              Total Users: {meta?.total ?? 0}
            </p>
          </div>

          <div className="flex gap-2">

            <Link
              to="/users/create"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Add User
            </Link>

            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              Logout
            </button>

          </div>

        </div>


        <div className="mb-6 flex flex-wrap gap-4">

          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-80 rounded border p-2"
          />
          <button
          type='submit'
            onClick={() => {
              setPage(1)
              setSearch(searchInput)
            }}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Search
          </button>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value)
              setPage(1)
            }}
            className="rounded border p-2"
          >
            <option value="id">ID</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email</option>
            <option value="city">City</option>
            <option value="country">Country</option>
          </select>

          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value)
              setPage(1)
            }}
            className="rounded border p-2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full border border-gray-300">

            <thead className="bg-gray-200">

              <tr>

                <th className="border p-3">ID</th>
                <th className="border p-3">First Name</th>
                <th className="border p-3">Last Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">City</th>
                <th className="border p-3">Province</th>
                <th className="border p-3">Country</th>
                <th className="border p-3">Actions</th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="p-6 text-center"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (

                  <tr key={user.id}>

                    <td className="border p-3">{user.id}</td>
                    <td className="border p-3">{user.firstName}</td>
                    <td className="border p-3">{user.lastName}</td>
                    <td className="border p-3">{user.email}</td>
                    <td className="border p-3">{user.phone}</td>
                    <td className="border p-3">{user.city}</td>
                    <td className="border p-3">{user.province}</td>
                    <td className="border p-3">{user.country}</td>

                    <td className="border p-3">

                      <div className="flex gap-2">

                        <Link
                          to={`/users/edit/${user.id}`}
                          className="rounded bg-yellow-500 px-3 py-1 text-white"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded bg-red-600 px-3 py-1 text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        <div className="mt-6 flex items-center justify-between">

          <div>
            Page {meta?.currentPage ?? 1} of {meta?.lastPage ?? 1}
          </div>

          <div className="flex gap-2">

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={page >= (meta?.lastPage ?? 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}