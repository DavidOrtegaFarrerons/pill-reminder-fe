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
import classes from './AuthenticationImage.module.css';
import {AuthenticationImage} from "@/components/AuthenticationImage/AuthenticationImage";
import {Link, useNavigate, useNavigation} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {login} from "@/services/authService";

export function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length > 0 ? null : 'Password is empty'
        }
    })
    const handleSubmit = async (values: typeof form.values) => {
        setIsLoading(true)

        try {
            const data = await login(values.email, values.password)
            return navigate('/overview')
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthenticationImage title={'Welcome back!'}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
                Don't have an account? {' '}
                <Link to={'/register'}>
                    Register
                </Link>
            </Text>
        </AuthenticationImage>
    );
}