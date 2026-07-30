import api from '../api/axios'

export const login = (email: string, password: string) => {
  return api.post('/auth/login', {
    email,
    password,
  })
}
export const logout = () =>
  api.post('/auth/logout')
export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
  })

  return response.data
}