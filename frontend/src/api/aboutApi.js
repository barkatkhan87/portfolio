import api from './axios'

export const aboutApi = {
  get: async () => {
    return await api.get('/about')
  },

  update: async (data) => {
    return await api.put('/about', data)
  },

  updateAvatar: async (formData) => {
    return await api.put('/about/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateResume: async (formData) => {
    return await api.put('/about/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  addExperience: async (data) => {
    return await api.post('/about/experience', data)
  },

  updateExperience: async (expId, data) => {
    return await api.put(`/about/experience/${expId}`, data)
  },

  deleteExperience: async (expId) => {
    return await api.delete(`/about/experience/${expId}`)
  },

  addEducation: async (data) => {
    return await api.post('/about/education', data)
  },

  updateEducation: async (eduId, data) => {
    return await api.put(`/about/education/${eduId}`, data)
  },

  deleteEducation: async (eduId) => {
    return await api.delete(`/about/education/${eduId}`)
  },
}