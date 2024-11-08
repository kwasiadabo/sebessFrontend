import axios from 'axios';

export default axios.create({
	baseURL: 'https://sebessbackend.onrender.com/api/smsfetch',
	//baseURL: 'http://localhost:41636/api/smsfetch',
});
