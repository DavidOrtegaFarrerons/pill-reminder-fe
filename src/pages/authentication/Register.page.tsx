import {
    Anchor,
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form'
import {AuthenticationImage} from "@/components/AuthenticationImage/AuthenticationImage";
import {Link} from "react-router-dom";
import {useState} from "react";
import {register} from "@/services/authService";

export function RegisterPage() {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validate: {
            name: (value) => value.length > 0 ? null : 'Name length must be of at least 1 character',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length >= 8 ? null : 'Password length must be of at least 8 characters'
        }
    })
     const handleSubmit = async (values: typeof form.values) => {
        setIsLoading(true)

         try {
            const data = await register(values.name, values.email, values.password)
             console.log("Registered successfully ", data)
         } catch (error) {

         } finally {
             setIsLoading(false)
         }
    }
    return (
        <AuthenticationImage title={'Register and keep track of your pills!'}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Name"
                    placeholder="Jhon Doe"
                    size="md"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email address"
                    placeholder="hello@gmail.com"
                    mt="md"
                    size="md"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                    size="md"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <Button fullWidth mt="xl" size="md" type="submit" loading={isLoading}>
                    Register
                </Button>
            </form>
            <Text ta="center" mt="md">
                Already have an account? {' '}
                <Link to={'/login'}>
                    Login
                </Link>
            </Text>
        </AuthenticationImage>
    );
}