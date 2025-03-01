import { useState } from "react";
import { Container, Grid, Card, Text, Title, Badge, Group, Button, SegmentedControl, TextInput, Flex, Modal } from "@mantine/core";
import { IconSearch, IconPill, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {take} from "@/services/pillIntakeService";
import {PillIntakeStatus} from "@/enum/PillIntakeStatus";

interface Pill {
    id: number;
    name: string;
    startDate: string;
    frequency: string;
    nextPillTime: string;
    taken?: boolean;
    intakeId: number,
    intakeStatus: PillIntakeStatus,
    intakeTime: Date
}

export default function PillsOverview({ pills, onReload }: { pills: Pill[], onReload: () => void }) {
    dayjs.extend(isBetween);
    const [date, setDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPill, setSelectedPill] = useState<Pill | null>(null);

    console.log(pills)
    // Filter pills based on date, search, and status
    const filteredPills = pills.filter((pill) => {
        const now = dayjs(date); // Current date
        const nextPillTime = dayjs(pill.nextPillTime); // The scheduled time for the next pill
        const isToday = now.isSame(nextPillTime, "day") && !now.isAfter(nextPillTime, "hour");
        const isMissed = now.isAfter(nextPillTime, "hour");
        const matchesSearch = pill.name.toLowerCase().includes(search.toLowerCase());

        if (filter === "today") return isToday && matchesSearch;
        if (filter === "missed") return isMissed && matchesSearch;

        return matchesSearch;
    });

    const handlePillTaken = async (pill: Pill) => {
        const now = dayjs();
        const pillTime = dayjs(pill.nextPillTime);
        const isWithinTimeRange = now.isBetween(pillTime.subtract(5, 'minute'), pillTime.add(5, 'minute'));

        if (isWithinTimeRange) {
            await take(pill.intakeId, PillIntakeStatus.TAKEN);
            onReload(); // Reload parent data
        } else {
            setSelectedPill(pill);
            setModalOpen(true);
        }
    };

    const confirmPillTaken = async (status: PillIntakeStatus = PillIntakeStatus.TAKEN) => {
        if (selectedPill) {
            await take(selectedPill.intakeId, status);
            onReload();
            setModalOpen(false);
            setSelectedPill(null);
        }
    };

    return (
        <Container size="lg" py="md">
            <Group position="apart" mb="md">
                <Title order={2}>Your Pills</Title>
                <Group>
                    <Button variant="default" onClick={() => setDate(dayjs(date).subtract(1, "day").toDate())}>
                        <IconChevronLeft size={18} />
                    </Button>
                    <Text weight={600}>{dayjs(date).format("DD MMMM YYYY")}</Text>
                    <Button variant="default" onClick={() => setDate(dayjs(date).add(1, "day").toDate())}>
                        <IconChevronRight size={18} />
                    </Button>
                </Group>
            </Group>

            <Flex mb="lg" gap="md" wrap="wrap">
                <TextInput
                    placeholder="Search pills..."
                    icon={<IconSearch size={16} />}
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                />
                <SegmentedControl
                    data={[{ label: "All", value: "all" }, { label: "Upcoming", value: "today" }, { label: "Missed", value: "missed" }]}
                    value={filter}
                    onChange={setFilter}
                />
            </Flex>

            <Grid gutter="md">
                {filteredPills.map((pill) => (
                    <Grid.Col key={pill.id} xs={12} sm={6} md={4} lg={3}>
                        <Card shadow="md" radius="md" padding="md" withBorder>
                            <Group position="apart">
                                <IconPill size={24} />
                                <Badge color="blue">{pill.frequency}</Badge>
                            </Group>
                            <Text weight={500} mt="sm">{pill.name}</Text>
                            <Text size="sm" color="dimmed">
                                {dayjs(pill.startDate).format("DD MMM YYYY")} - {dayjs(pill.endDate).format("DD MMM YYYY")}
                            </Text>
                            <Text size="sm" color="dimmed">Next Pill: {dayjs(pill.nextPillTime).format("HH:mm")}</Text>
                            <Button fullWidth mt="md" onClick={() => handlePillTaken(pill)}>
                                Pill Taken
                            </Button>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Adjust Next Pill Schedule"
            >
                <Text>Do you want to adjust the next pill schedule for {selectedPill?.name}?</Text>
                <Flex >
                    <Button mt="md" mr="md" onClick={() => confirmPillTaken(PillIntakeStatus.ADJUSTED)}>
                        Yes, Adjust Schedule
                    </Button>
                    <Button mt="md" variant="outline" onClick={() => confirmPillTaken()}>
                        No, I took it at {dayjs(selectedPill?.nextPillTime).format("HH:mm")}
                    </Button>
                </Flex>
            </Modal>
        </Container>
    );
}