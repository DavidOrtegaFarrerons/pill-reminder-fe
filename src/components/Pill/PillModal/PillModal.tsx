import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {PillForm} from "@/components/Pill/PillForm/PillForm";

interface AddPillModalProps {
    opened: boolean;
    onClose: () => void;
}

export function AddPillModal({ opened, onClose }: AddPillModalProps) {
    const handleSave = (data: any) => {
        console.log('Data to save:', data);
        onClose(); // Close the modal after saving
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Add a New Pill" size="lg">
            <PillForm onSave={handleSave} />
        </Modal>
    );
}