import axios from 'axios'
import {API_URL} from "@/constants/const";
import {CreatePillFormProps} from "@/components/Pill/CreatePillForm/CreatePillForm.types";

export async function create(pill: CreatePillFormProps) {
    try {
        const response = await axios.post(`${API_URL}/pills`, pill);

        return response.data.message;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Could not add pill');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function update(id: number, values) {
    try {
        const response = await axios.put(`${API_URL}/pills/${id}`, values);

        return response.data.message;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Could not add pill');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function getAll() {
    try {
        const response = await axios.get(`${API_URL}/pills`);

        return response.data.pills;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Could not add pill');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}