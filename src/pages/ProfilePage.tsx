import { useState, useEffect } from "react";
import { TextInput, PasswordInput, Button, Container, Title, Paper, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getUser, updateUser } from "@/services/userService";

export function ProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUser();
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (password.length >= 8 || password.length === 0) {
            setPasswordError("");
        }
    }, [password]);

    const handleUpdateProfile = async () => {
        if (password.length > 0 && password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }

        const success = await updateUser(name, password);

        if (success) {
            notifications.show({ title: "Success", message: "Profile updated!", color: "green" });
        } else {
            notifications.show({ title: "Error", message: "Failed to update profile.", color: "red" });
        }
    };

    return (
        <Container size="sm">
            <Paper shadow="xs" p="xl">
                <Title order={2} mb="md">Profile Settings</Title>
                <TextInput label="Email" value={email} disabled />
                <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />

                <PasswordInput
                    label="New Password"
                    placeholder="Enter a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <Text color="red" size="sm">{passwordError}</Text>}

                <Group mt="md">
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                </Group>
            </Paper>
        </Container>
    );
}