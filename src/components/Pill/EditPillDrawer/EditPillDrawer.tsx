import { useState, useEffect } from "react";
import {Drawer, Button, Stack, TextInput, Textarea, NumberInput} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { Pill } from "@/types/pill";
import { notifications } from "@mantine/notifications";
import {DatePickerInput, TimeInput} from "@mantine/dates";
import dayjs from "dayjs";
import {NativeSelect} from "@mantine/core";
import {update} from "@/services/pillService";

interface PillEditDrawerProps {
    opened: boolean;
    onClose: () => void;
    pill: Pill | null;
    onReload: () => void;
}

export function EditPillDrawer({ opened, onClose, pill, onReload }: PillEditDrawerProps) {
    const form = useForm({
        initialValues: {
            name: "",
            startDate: "",
            startTime: "",
            frequency: "",
            durationDays: "",
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : 'Pill name is required'),
            startDate: (value, values) => {
                if (!value) return 'Start date is required';
                return null;
            },
            startTime: (value) => (value ? null : 'Start time is required'),
            frequency: (value) => (value ? null : 'Frequency is required'),
            durationDays: (value) => (value > 0 ? null : 'Duration must be greater than 0'),
        },
    });

    useEffect(() => {
        if (pill) {
            // noinspection TypeScriptValidateTypes
            form.setValues({
                name: pill.name,
                startDate: new Date(pill.startDate),
                startTime: dayjs(pill.startDate).hour().toString().padStart(2, '0') +
                    ":" +
                    dayjs(pill.startDate).minute().toString().padStart(2, '0'),

                frequency: pill.frequency,
                durationDays: dayjs(pill.endDate).diff(dayjs(pill.startDate), 'day')
            });
        }
    }, [pill]);

    const handleSubmit = async (values: typeof form.values) => {
        if (pill) {
            await update(pill.id, values);
            notifications.show({ color: 'green', title: 'Pill Updated', message: 'Pill information has been updated.' });
            onReload();
            onClose();
        }
    };

    return (
        <Drawer opened={opened} onClose={onClose} title="Edit Pill" padding="md" size="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="Name"
                        {...form.getInputProps('name')}

                    />
                    <DatePickerInput
                        label="Start Date"
                        {...form.getInputProps('startDate')}

                    />
                    <TimeInput
                        label="Start Time"
                        {...form.getInputProps('startTime')}

                    />
                    <NativeSelect
                        label="Frequency"
                        data={[
                            { label: 'Select the frequency', value: '', disabled: true },
                            { label: 'Every 4 hours', value: '4 hours' },
                            { label: 'Every 8 hours', value: '8 hours' },
                            { label: 'Every 12 hours', value: '12 hours' },
                            { label: 'Every day', value: '1 day' },
                        ]}
                        {...form.getInputProps('frequency')}

                    />
                    <NumberInput
                        mt={20}
                        label={"Number of days you will be taking " + form.values.name}
                        {...form.getInputProps('durationDays')}
                    />
                    <Button type="submit" mt={20}>Update pill information</Button>
                </Stack>
            </form>
        </Drawer>
    );
}
