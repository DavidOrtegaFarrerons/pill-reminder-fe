import {PillIntakeStatus} from "@/enum/PillIntakeStatus";

export interface Pill {
    id: number;
    name: string;
    startDate: string;
    endDate : string
    frequency: string;
    nextPillTime: string;
    taken?: boolean;
    intakeId: number,
    intakeStatus: PillIntakeStatus,
    intakeTime: Date
}