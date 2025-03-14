import { useEffect, useState } from "react";
import { Box, Center, Loader, Stack } from "@mantine/core";
import {getHistory} from "@/services/pillIntakeService";
import {PillHistoryCard} from "@/components/Pill/PillHistoryCard/PillHistoryCard";


export function HistoryPage() {
    const [pills, setPills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await getHistory();
            setPills(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching pills:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    return (
        <Box mt={20}>
            <Center>
                <Stack spacing="md">
                    {pills.map((pill) => (
                        <PillHistoryCard pill={pill} />
                    ))}
                </Stack>
            </Center>
        </Box>
    );
}