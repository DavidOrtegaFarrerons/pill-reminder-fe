import { Burger, Container, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

const links = [
    { link: "/add-pill", label: "Add new Pill" },
    { link: "/overview", label: "Overview" },
    { link: "/history", label: "Pill History" },
];

export function Header({ name }: { name: string | null }) {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <a key={link.label} href={link.link} className={classes.link}>
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <MantineLogo size={28} />
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                <Group>
                    <a href="/profile">
                        <Button size="xs" variant="outline">Profile</Button>
                    </a>
                </Group>
            </Container>
        </header>
    );
}