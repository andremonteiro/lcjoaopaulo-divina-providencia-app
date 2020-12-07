import axios from 'axios';

const api = axios.create({ baseURL: 'https://shrouded-castle-28692.herokuapp.com' });

export default api;
