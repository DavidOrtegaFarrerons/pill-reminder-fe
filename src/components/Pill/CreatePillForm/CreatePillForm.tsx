import { useState } from 'react';
import {
    NumberInput,
    TextInput,
    Button,
    Group,
    Box,
    Stepper,
    Title,
    NativeSelect,
    Center,
    Flex,
    useMantineTheme,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import '@mantine/dates/styles.css';
import {create} from "@/services/pillService";
import {useNavigate} from "react-router-dom";
import {notifications} from "@mantine/notifications";
import {CreatePillFormProps} from "@/components/Pill/CreatePillForm/CreatePillForm.types";
import dayjs from "dayjs";

export function CreatePillForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [startToday, setStartToday] = useState<boolean | null>(null);
    const navigate = useNavigate();

    // Initialize useForm
    const form = useForm({
        initialValues: {
            name: '',
            startDate: null as Date | null,
            startTime: '',
            frequency: '',
            durationDays: '',
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : 'Pill name is required'),
            startDate: (value, values) => {
                if (startToday === false && !value) return 'Start date is required';
                return null;
            },
            startTime: (value) => {
                if (!value) return 'Start time is required';
                const currentTime = dayjs();
                if (dayjs(form.values.startDate).isSame(currentTime, "day")) {
                    const [hours, minutes] = value.split(":").map(Number);
                    const selectedTime = dayjs().hour(hours).minute(minutes).second(0);

                    if (selectedTime.isBefore(currentTime, "minute")) {
                        return "Start time cannot be in the past";
                    }
                }

                return null;
            },
            frequency: (value) => (value ? null : 'Frequency is required'),
            durationDays: (value) => (value > 0 ? null : 'Duration must be greater than 0'),
        },
    });

    const nextStep = () => {
        if (activeStep === 0 && form.validateField('name').hasError) {
            return;
        } else if (activeStep === 1) {
            if (startToday === false && form.validateField('startDate').hasError) {
                    return;
            }

            setStartToday(null);
        } else if (activeStep === 2) {
            form.validateField('startTime');
            form.validateField('frequency');
            form.validateField('durationDays');
            if (form.errors.startTime || form.errors.frequency || form.errors.durationDays) return;
        }
        setActiveStep((current) => current + 1);
    };

    const prevStep = () => {
        setActiveStep((current) => current - 1);
    };

    const handleStartToday = () => {
        setStartToday(true);
        form.setFieldValue('startDate', new Date());
        nextStep()
    };

    const handleStartLater = () => {
        setStartToday(false);
    };

    const handleSubmit = async (values: typeof form.values) => {
        const pill: CreatePillFormProps = {
            name: form.values.name,
            startDate: form.values.startDate,
            startTime: form.values.startTime,
            frequency: form.values.frequency,
            durationDays: parseInt(form.values.durationDays),
        }

        try {
            await create(pill)
            notifications.show({
                title: 'Pill created successfully!',
                message: "You can now see your new pill in the overview",
            });
            navigate('/overview')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm" allowNextStepsSelect={false}>
                {/* Step 1: Naming */}
                <Stepper.Step label="Naming">
                    <Center>
                        <Box>
                            <Title order={4} mb="md">
                                What is the name of the pill you will be taking?
                            </Title>
                            <Group>
                                <TextInput
                                    size="md"
                                    label="Pill name"
                                    placeholder="Ibuprofen"
                                    {...form.getInputProps('name')}
                                />
                            </Group>
                        </Box>
                    </Center>
                </Stepper.Step>

                {/* Step 2: When */}
                <Stepper.Step label="When">
                    <Center>
                        <Box>
                            <Title order={4} mb="md">
                                {"When will you start taking " + form.values.name + "?"}
                            </Title>
                            <Group>
                                {/* Ask if the user starts today */}
                                {startToday === null && (
                                    <Group>
                                        <Button variant="filled" size="lg" onClick={handleStartToday}>
                                            I will start today
                                        </Button>
                                        <Button variant="outline" size="lg" onClick={handleStartLater}>
                                            I will start later
                                        </Button>
                                    </Group>
                                )}

                                {/* If the user selects "I will start later", show the date picker */}
                                {startToday === false && (
                                    <DatePicker
                                        placeholder="Select start date"
                                        minDate={new Date()}
                                        {...form.getInputProps('startDate')}
                                        mb="md"
                                    />
                                )}
                            </Group>
                        </Box>
                    </Center>
                </Stepper.Step>

                {/* Step 3: Last Details */}
                <Stepper.Step label="Last Details">
                    <Center>
                        <Box>
                            <Center>
                                <TimeInput
                                    size="md"
                                    label="At what time will you start taking your pill?"
                                    {...form.getInputProps('startTime')}
                                />
                            </Center>
                            <NativeSelect
                                mt={20}
                                size="md"
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
                                size="md"
                                label={"Number of days you will be taking " + form.values.name}
                                {...form.getInputProps('durationDays')}
                            />
                        </Box>
                    </Center>
                </Stepper.Step>
            </Stepper>

            {/* Navigation Buttons */}
            <Center>
                <Box>
                    <Flex justify="flex-start" align="flex-start" direction="row" wrap="wrap">
                        <Group mt="xl">
                            {activeStep !== 0 && (
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                            )}
                            {activeStep !== 2 ? (
                                <Button onClick={nextStep}>Next</Button>
                            ) : (
                                <Button onClick={() => form.onSubmit(handleSubmit)()}>Save</Button>
                            )}
                        </Group>
                    </Flex>
                </Box>
            </Center>
        </Box>
    );
}