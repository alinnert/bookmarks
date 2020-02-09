import axios from 'axios'

export const api = axios.create({
  baseURL: '//localhost:8000/api',
  transformResponse: [],
  withCredentials: true,
  responseType: 'json'
})
