import axios from 'axios'

const API_URL = 'http://localhost:8080/api'
export async function register(name: string, email: string, password: string) {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email,
            name,
            password
        });

        return response.data.message;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        }, {
            withCredentials: true,
            credentials: true
        });

        return response.data.message
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Login failed');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}