import { useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import { login } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to="/users" replace />
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await login(email, password)

      localStorage.setItem('token', response.data.token)

      navigate('/users',{replace:true})
    } catch (error) {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-96 rounded-lg border p-6 shadow"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Admin Login
        </h1>

        <input
          className="mb-4 w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
        type='submit'
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          Login
        </button>
        <h1>Sign up for an account</h1>
        <button
        type='button'
          onClick={() => navigate('/signup')}
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}