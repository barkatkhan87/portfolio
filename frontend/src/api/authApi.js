import api from './axios'

export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response
  },

  logout: async () => {
    const response = await api.post('/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return response
  },

  getMe: async () => {
    return await api.get('/auth/me')
  },

  updateProfile: async (formData) => {
    return await api.put('/auth/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  changePassword: async (data) => {
    return await api.put('/auth/password', data)
  },
}