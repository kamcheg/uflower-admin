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

axios.interceptors.response.use(
  response => response,
  async (error) => {
    const isOnLoginPage = window.location.pathname === '/login';

    if (!error.config.url.startsWith(axios.defaults.baseURL)) {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !isOnLoginPage) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
