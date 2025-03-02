import {PillForm} from "@/components/Pill/PillForm/PillForm";
import {Container} from "@mantine/core";
import {CreatePillForm} from "@/components/Pill/CreatePillForm/CreatePillForm";

export function AddPillPage() {
    return (
        <Container
            p={50}
        >
            <CreatePillForm/>
        </Container>

    )
}