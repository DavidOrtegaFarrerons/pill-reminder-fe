import axios from 'axios'
import {PillFormProps} from "@/components/Pill/PillForm/PillForm";
import {API_URL} from "@/constants/const";
import {PillIntakeStatus} from "@/enum/PillIntakeStatus";

export async function take(id: number, status: PillIntakeStatus) {
    try {
        const response = await axios.put(`${API_URL}/pill-intake/${id}`, {
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