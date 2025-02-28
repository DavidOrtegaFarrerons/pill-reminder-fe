import { useState } from 'react';
import {NumberInput, TextInput, Button, Group, Box, Stepper, Title, Text, NativeSelect, Center, Flex} from '@mantine/core';
import {DatePicker, TimeInput} from '@mantine/dates';
import '@mantine/dates/styles.css';
interface PillFormProps {
    onSave: (data: any) => void;
}

export function PillForm({ onSave }: PillFormProps) {
    const [activeStep, setActiveStep] = useState(0);

    const [startToday, setStartToday] = useState<boolean | null>(null); // Track if user starts today
    const [startDate, setStartDate] = useState<Date | null>(null); // Track selected start date
    const [startTime, setStartTime] = useState<Date | null>(null); // Track selected start time

    const [formData, setFormData] = useState({
        startDate: null as Date | null,
        startTime: null as Date | null,
        endDate: null as Date | null,
        totalPills: null as number | null,
        pillName: '',
        frequency: 24,
    });

    function nextStep() {
        setActiveStep((current) => current + 1);
        if (startTime !== null) {
            //Set the "half" second step (when will you start taking the pill
            //as null so when the user goes back, it shows up again
            setStartToday(() => null);
        }
    }

    function prevStep() {
        setActiveStep((current) => current - 1);
        if (startToday !== null) {
            //Set the "half" second step (when will you start taking the pill
            //as null so when the user goes forward, it shows up again
            setStartToday(() => null);
        }
    }

    const handleStartToday = () => {
        setStartToday(true); // User starts today
        setStartDate(new Date()); // Pre-fill today's date
    };

    const handleStartLater = () => {
        setStartToday(false); // User will select a date
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        onSave(formData); // Send data to parent component
    };

    return (
        <Box>
            <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm" allowNextStepsSelect={false}>
                {/* Step 1: Duration */}
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
                                    value={formData.pillName}
                                    onChange={(e) => setFormData({ ...formData, pillName: e.target.value })}
                                />
                            </Group>
                        </Box>
                    </Center>

                </Stepper.Step>

                {/* Step 2: Total Pills */}
                <Stepper.Step label="When">
                    <Center>
                        <Box>
                            <Title order={4} mb="md">
                                {"When will you start taking " + formData.pillName + "?"}
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
                                        value={formData.startDate}
                                        minDate={new Date(Date.now())}
                                        onChange={(value) => setFormData({...formData, startDate: value})}
                                        mb="md"
                                    />
                                )}
                            </Group>
                        </Box>
                    </Center>
                </Stepper.Step>

                {/* Step 3: Pill Details */}
                <Stepper.Step label="Last Details">
                    <Center>
                        <Box>

                            <Center>
                                <TimeInput
                                    size="md"
                                    value={formData.startTime}
                                    label="At what time will you start taking your pill?"
                                    onChange={(e) => setFormData({...formData, startTime: e.target.value })}
                                />
                            </Center>
                            <NativeSelect
                                mt={20}
                                size="md"
                                label="Frequency"
                                onChange={(event) => setFormData({...formData, frequency: event.currentTarget.value})}
                                defaultValue={''}
                                data={
                                    [
                                        { label: 'Select the frequency', value: '', disabled: true },
                                        { label: 'Every 4 hours', value: '4 hours' },
                                        { label: 'Every 8 hours', value: '8 hours' },
                                        { label: 'Every 12 hours', value: '12 hours',},
                                        { label: 'Every day', value: '1 day' },
                                    ]}
                            />
                            <NumberInput
                                mt={20}
                                size="md"
                                label={"Number of days you will be taking " + formData.pillName}
                                placeholder="7"
                            />

                        </Box>
                    </Center>
                </Stepper.Step>
            </Stepper>

            {/* Navigation Buttons */}
            <Center>
                <Box>
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                    >
                        <Group mt="xl">
                            {activeStep !== 0 && (
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                            )}
                            {activeStep !== 2 ? (
                                <Button onClick={nextStep}>Next</Button>
                            ) : (
                                <Button onClick={handleSubmit}>Save</Button>
                            )}
                        </Group>
                    </Flex>

                </Box>
            </Center>
        </Box>
    );
}