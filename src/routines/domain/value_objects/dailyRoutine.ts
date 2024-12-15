interface Exercise {
    name: string;
    description: string;
    muscleGroup: string;
    equipment: string;
    type: string;
    mechanics: string;
    difficulty: string;
    instructions: {};
    imageUrl: string;
}

export interface DailyRoutine {
    name: string;
    description: string;
    exercises: Exercise[];
}