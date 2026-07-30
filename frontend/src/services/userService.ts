import api from '../api/axios'

export const getUsers = (
  page = 1,
  limit = 10,
  search = '',
  sortBy = 'id',
  order = 'asc'
) =>
  api.get('/users', {
    params: {
      page,
      limit,
      search,
      sortBy,
      order,
    },
  })

export const getUser = (id: number) =>
  api.get(`/users/${id}`)

export const createUser = (data: object) =>
  api.post('/users', data)

export const updateUser = (id: number, data: object) =>
  api.put(`/users/${id}`, data)

export const deleteUser = (id: number) =>
  api.delete(`/users/${id}`)