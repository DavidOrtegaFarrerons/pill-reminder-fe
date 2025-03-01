import axios from 'axios'
import {PillFormProps} from "@/components/Pill/PillForm/PillForm";
import {API_URL} from "@/constants/const";

export async function create(pill: PillFormProps) {
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