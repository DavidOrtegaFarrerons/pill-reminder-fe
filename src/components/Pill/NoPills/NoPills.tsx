import { Box, Button, Text, Title } from '@mantine/core';

interface EmptyStateProps {
    onAddPill: () => void;
}

export function NoPills({ onAddPill }: EmptyStateProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                textAlign: 'center',
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
    );
}