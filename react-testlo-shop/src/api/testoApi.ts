import axios from 'axios'

const testoApi = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

// TODO: INTERCEPTORES

testoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
export { testoApi };