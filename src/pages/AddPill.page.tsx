import {PillForm} from "@/components/Pill/PillForm/PillForm";
import {Container} from "@mantine/core";

export function AddPillPage() {
    const handleSubmit = (data) => {
        console.log(data)
    }
    return (
        <Container
            p={50}
        >
            <PillForm onSave={handleSubmit}/>
        </Container>

    )
}