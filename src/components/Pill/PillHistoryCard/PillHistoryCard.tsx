import { Card, Group, Text, Badge, Stack, Divider } from "@mantine/core";
import { IconClock, IconCheck, IconAdjustments } from "@tabler/icons-react";
import dayjs from "dayjs";



export function PillHistoryCard({ pill }: PillHistoryCardProps) {
    return (
            <Card key={pill.id} shadow="md" radius="md" padding="lg" withBorder>
                <Group position="apart" mb="xs">
                    <Text weight={600} size="lg">{pill.pillName}</Text>
                    <Badge
                        color={pill.status === "taken" ? "green" : "yellow"}
                        leftSection={pill.status === "taken" ? <IconCheck size={14} /> : <IconAdjustments size={14} />}
                    >
                        {pill.status.charAt(0).toUpperCase() + pill.status.slice(1)}
                    </Badge>
                </Group>

                <Divider my="sm" />

                <Stack spacing={2}>
                    <Group spacing="xs">
                        <IconClock size={16} color="#4dabf7" />
                        <Text size="sm" color="dimmed">
                            Taken at: {dayjs(pill.actualTime).format("D MMM YYYY, HH:mm")}
                        </Text>
                    </Group>

                    <Badge color="blue" variant="outline">
                        Frequency: {pill.frequency}
                    </Badge>
                </Stack>
            </Card>
    );
}
