import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Header.module.css';
import {ProfileIcon} from "@/components/ProfileIcon/ProfileIcon";
import {useNavigate} from "react-router-dom";

const links = [
    { link: '/add-pill', label: 'Add new Pill' },
    { link: '/overview', label: 'Overview' },
    { link: '/history', label: 'Pill History' },
];

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[1].link);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={window.location.pathname === link.link || undefined}
        >
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
                <ProfileIcon name={"David"}/>
            </Container>
        </header>
    );
}