import { Card, Group, Text, Badge, Button, ActionIcon, Tooltip, Stack, Divider } from "@mantine/core";
import { IconPill, IconEdit, IconClock, IconAlertCircle, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Pill } from "@/types/pill";

interface PillCardProps {
    pill: Pill;
    currentDate: Date;
    onPillTaken: (pill: Pill) => void;
    onEditPill?: (pill: Pill) => void;
    onDeletePill?: (pill: Pill) => void;
}

export function PillCard({ pill, currentDate, onPillTaken, onEditPill, onDeletePill }: PillCardProps) {
    const isPillMissed = dayjs(currentDate).isAfter(pill.nextPillTime);

    return (
        <Card shadow="lg" radius="md" padding="lg" withBorder style={{ colorm: '#e0e0e0' }}>
            <Group position="apart" mb="xs">
                <Group spacing="xs">
                    <IconPill size={28} style={{ color: '#4dabf7' }} />
                    <Text weight={600} size="lg">{pill.name}</Text>
                </Group>
                <Tooltip label="Edit Pill" withArrow>
                    <ActionIcon
                        color="blue"
                        variant="filled"
                        onClick={() => onEditPill?.(pill)}
                        size="lg"
                    >
                        <IconEdit size={20} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete Pill" withArrow>
                    <ActionIcon
                        color="red"
                        variant="filled"
                        onClick={() => onDeletePill?.(pill)}
                        size="lg"
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Tooltip>
            </Group>

            <Group position="apart" mb="sm">
                {isPillMissed && (
                    <Badge color="red" leftSection={<IconAlertCircle size={14} />}>
                        Pill Missed!
                    </Badge>
                )}
                <Badge color="blue" variant="filled">{pill.frequency}</Badge>
            </Group>

            <Divider my="sm" color="#4dabf7" />

            <Stack spacing={2}>
                <Text size="sm" color="#e0e0e0">
                    {dayjs(pill.startDate).format("DD MMM YYYY")} - {dayjs(pill.endDate).format("DD MMM YYYY")}
                </Text>
                <Group spacing="xs">
                    <IconClock size={16} color="#4dabf7" />
                    <Text size="sm" color="#e0e0e0">
                        Next Pill: {dayjs(pill.nextPillTime).format("D MMM YYYY: HH:mm")}
                    </Text>
                </Group>
            </Stack>

            <Button
                fullWidth
                mt="md"
                size="md"
                color="blue"
                onClick={() => onPillTaken(pill)}
                style={{ fontWeight: 600 }}
            >
                Take {pill.name} Pill
            </Button>
        </Card>
    );
}