import api from './axios'

export const dashboardApi = {
  getStats: async () => {
    return await api.get('/dashboard/stats')
  },

  getActivity: async (limit = 10) => {
    return await api.get(`/dashboard/activity?limit=${limit}`)
  },
}