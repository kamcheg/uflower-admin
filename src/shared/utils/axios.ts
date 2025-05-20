import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

// TODO если dadata выкинет 401 то у меня произойдет разлогирование
// Решение - сделать запрос на profile
axios.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
