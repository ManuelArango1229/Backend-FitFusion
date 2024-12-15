import { DailyRoutine } from "../value_objects/dailyRoutine";

export class Routine {
    constructor(
        private readonly id: string,
        private readonly userId: string,
        private readonly name: string,
        private readonly description: string,
        private readonly dailyRoutines: DailyRoutine[]
    ) {}

    getId(): string {
        return this.id;
    }

    getUserId(): string {
        return this.userId;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getDailyRoutines(): DailyRoutine[] {
        return this.dailyRoutines;
    }

    addDailyRoutine(dailyRoutine: DailyRoutine): void {
        this.dailyRoutines.push(dailyRoutine);
    }

    removeDailyRoutine(index: number): void {
        this.dailyRoutines.splice(index, 1);
    }
}

