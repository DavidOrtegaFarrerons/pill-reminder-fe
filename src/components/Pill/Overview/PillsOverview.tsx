import { useState } from "react";
import { Container, Grid, Card, Text, Title, Badge, Group, Button, SegmentedControl, TextInput, Flex, Modal, Drawer, Stack, Textarea } from "@mantine/core";
import { IconSearch, IconPill, IconChevronLeft, IconChevronRight, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {take} from "@/services/pillIntakeService";
import {PillIntakeStatus} from "@/enum/PillIntakeStatus";
import {notifications} from "@mantine/notifications";
import {PillCard} from "@/components/Pill/PillCard/PillCard";
import {Pill} from "@/types/pill";
import {DatePickerInput, TimeInput} from "@mantine/dates";
import {NativeSelect} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {EditPillDrawer} from "@/components/Pill/EditPillDrawer/EditPillDrawer";
import {remove} from "@/services/pillService";

export default function PillsOverview({ pills, onReload }: { pills: Pill[], onReload: () => void }) {
    dayjs.extend(isBetween);
    const [date, setDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedPill, setSelectedPill] = useState<Pill | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handlePillTaken = async (pill: Pill) => {
        const now = dayjs();
        const pillTime = dayjs(pill.nextPillTime);
        const isWithinTimeRange = now.isBetween(pillTime.subtract(5, 'minute'), pillTime.add(5, 'minute'));

        if (isWithinTimeRange) {
            await take(pill.intakeId, PillIntakeStatus.TAKEN);
            // noinspection TypeScriptValidateTypes
            notifications.show({ color: 'green', title: 'Pill Taken', message: 'You successfully took the pill.' });
            onReload();
        } else {
            setSelectedPill(pill);
            setModalOpen(true);
        }
    };

    const confirmPillTaken = async (status: PillIntakeStatus = PillIntakeStatus.TAKEN) => {
        if (selectedPill) {
            await take(selectedPill.intakeId, status);
            // noinspection TypeScriptValidateTypes
            notifications.show({ color: 'green', title: 'Pill Status Updated', message: 'Pill intake status has been updated.' });
            onReload();
            setModalOpen(false);
            setSelectedPill(null);
        }
    };

    const handleEditPill = (pill: Pill) => {
        setSelectedPill(pill);
        setDrawerOpen(true);
    };

    const handleDeletePill = (pill: Pill) => {
        setSelectedPill(pill);
        setDeleteModalOpen(true);
    };

    const confirmDeletePill = async () => {
        if (selectedPill) {
            await remove(selectedPill.id);

            notifications.show({
                color: "red",
                title: "Pill Deleted",
                message: `${selectedPill.name} has been removed.`,
            });

            onReload();
            setDeleteModalOpen(false);
            setSelectedPill(null);
        }
    };

    const filteredPills = pills.filter((pill) => {
        const pillTime = dayjs(pill.nextPillTime);
        const isToday = pillTime.isSame(date, 'day');
        const isMissed = pillTime.isBefore(dayjs()) && pill.intakeStatus !== PillIntakeStatus.TAKEN;

        if (filter === "today") return isToday;
        if (filter === "missed") return isMissed;
        return true;
    });

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
                    data={[{ label: "All", value: "all" }, { label: "Today", value: "today" }, { label: "Missed", value: "missed" }]}
                    value={filter}
                    onChange={setFilter}
                />
            </Flex>

            <Grid gutter="md">
                {filteredPills.map((pill) => (
                    <Grid.Col key={pill.id} xs={12} sm={6} md={4} lg={3}>
                        <PillCard pill={pill} currentDate={date} onPillTaken={handlePillTaken} onEditPill={handleEditPill} onDeletePill={handleDeletePill} />
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
            <EditPillDrawer opened={drawerOpen} onClose={() => setDrawerOpen(false)} pill={selectedPill} onReload={() => onReload()}/>
            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Deletion"
            >
                <Text>Are you sure you want to delete {selectedPill?.name}? This will also delete all the information of times you have taken this pill.</Text>
                <Flex mt="md" gap="md">
                    <Button color="red" onClick={confirmDeletePill}>Yes, Delete</Button>
                    <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                </Flex>
            </Modal>
        </Container>
    );
}