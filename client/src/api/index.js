import axios from 'axios';

const url = 'http://localhost:5000/api/users/all';

export const fetchUsers = () => axios.get(url);