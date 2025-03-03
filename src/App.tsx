import '@mantine/core/styles.css';

import {AppShell, MantineProvider} from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import axios from "axios";
import '@mantine/notifications/styles.css';
import {Notifications} from "@mantine/notifications";
import {Header} from "@/components/Header/Header";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from "dayjs";


axios.defaults.withCredentials = true;
export default function App() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Europe/Madrid");
  return (
    <MantineProvider theme={theme}>
        <AppShell padding="md"
        >
            <AppShell.Header><Header/></AppShell.Header>
            <Notifications/>
            <AppShell.Main mt={41}>
                <Router />
            </AppShell.Main>

        </AppShell>
    </MantineProvider>
  );
}
