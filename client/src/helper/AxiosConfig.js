import axios from 'axios';

const api = axios.create({ baseURL: "https://authenticate-server.onrender.com/api/v1" })

export default api;