import axios from "axios";
import { API_URL } from "@/constants/const";

export async function getUser() {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
}

export async function updateUser(name: string, password: string): Promise<boolean> {
    try {
        await axios.put(`${API_URL}/user`, { name, password });
        return true;
    } catch (error) {
        console.error("Error updating profile:", error);
        return false;
    }
}