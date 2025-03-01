import { Box, Button, Text, Title, Center } from '@mantine/core';
import {useNavigate} from "react-router-dom";

export function NoPills() {
    const navigate = useNavigate();

    const onAddPill = () => {
        navigate('/add-pill')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    padding: '1rem',
                }}
            >
                <Title order={3} mb="md">
                    No Pills Found
                </Title>
                <Text mb="xl" color="dimmed">
                    It looks like you haven't added any pills yet. Start by adding your first pill!
                </Text>
                <Button onClick={onAddPill} size="lg">
                    Add Your First Pill
                </Button>
            </Box>
        </Box>


    );
}