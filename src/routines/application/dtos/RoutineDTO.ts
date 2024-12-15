
export interface CreateRoutineDTO {
    userId: string;
    name: string;
    description: string;
    dailyRoutines: {
        name: string;
        description: string;
        exercises: {
            name: string;
            description: string;
            muscleGroup: string;
            equipment: string;
            type: string;
            mechanics: string;
            difficulty: string;
            instructions: object;
            imageUrl: string;
        }[];
    }[];
}


export interface RoutineResponseDTO {
    id: string;
    userId: string;
    name: string;
    description: string;
    dailyRoutines: {
        name: string;
        description: string;
        exercises: {
            name: string;
            description: string;
            muscleGroup: string;
            equipment: string;
            type: string;
            mechanics: string;
            difficulty: string;
            instructions: object;
            imageUrl: string;
        }[];
    }[];
}
