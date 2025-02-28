import {Header} from "@/components/Header/Header";
import {useState} from "react";
import {Box, Center} from "@mantine/core";
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
        <Center>
            <Box
                mt={50}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh', // Full viewport height
                    textAlign: 'center',
                }}
            >
                {pills.length === 0 ? (
                    <NoPills onAddPill={handleAddPill} />
                ) : (
                    <div>
                        {/* Render list of pills here */}
                    </div>
                )}
            </Box>
        </Center>
    );
}
