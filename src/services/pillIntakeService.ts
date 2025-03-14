import axios from 'axios'
import { notifications } from '@mantine/notifications';
import {API_URL} from "@/constants/const";
import {PillIntakeStatus} from "@/enum/PillIntakeStatus";

export async function take(id: number, status: PillIntakeStatus) {
    try {
        const response = await axios.put(`${API_URL}/pill-intakes/${id}`, {
            'status': status
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Could not set pill intake as taken');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function getHistory() {
    try {
        const response =  await axios.get(`${API_URL}/pill-intake`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Could not get pill intake history');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}