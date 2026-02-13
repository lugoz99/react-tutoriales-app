import axios from "axios";



export const githubApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    // todo: api_keys
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
})