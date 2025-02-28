import {Header} from "@/components/Header/Header";
import {useState} from "react";
import {Container} from "@mantine/core";
import {AddPillModal} from "@/components/Pill/PillModal/PillModal";
import {NoPills} from "@/components/Pill/NoPills/NoPills";
import {useNavigate, useNavigation} from "react-router-dom";

export function OverviewPage() {
    const [pills, setPills] = useState<any[]>([]); // Replace `any` with your pill type
    const [modalOpened, setModalOpened] = useState(false);
    const navigate = useNavigate();

    const handleAddPill = () => {
        navigate('/add-pill')
    };

    return (
        <Container size="lg">
            {pills.length === 0 ? (
                <NoPills onAddPill={handleAddPill} />
            ) : (
                <div>
                    {/* Render list of pills here */}
                </div>
            )}

            {/* AddPillModal */}
            <AddPillModal opened={modalOpened} onClose={() => setModalOpened(false)} />
        </Container>
    );
}
