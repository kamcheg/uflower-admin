import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

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
