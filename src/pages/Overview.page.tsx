import { useEffect, useState } from "react";
import { Box, Center, Loader } from "@mantine/core";
import { NoPills } from "@/components/Pill/NoPills/NoPills";
import { getAll } from "@/services/pillService";
import PillsOverview from "@/components/Pill/Overview/PillsOverview";

export function OverviewPage() {
    const [pills, setPills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPills = async () => {
        setLoading(true);
        try {
            const data = await getAll();
            setPills(data);
        } catch (error) {
            console.error("Error fetching pills:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPills();
    }, []);

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    return (
        <Center>
            <Box
                mt={50}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh',
                    textAlign: 'center',
                }}
            >
                {pills.length === 0 ? (
                    <NoPills />
                ) : (
                    <PillsOverview pills={pills} onReload={fetchPills} />
                )}
            </Box>
        </Center>
    );
}