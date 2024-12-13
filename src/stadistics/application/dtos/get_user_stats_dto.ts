export interface GetUserStatsDTO {
  userId: string;
  currentStats: {
    weight: number;
    height: number;
    measureBiceps: number;
    measureChest: number;
    measureHip: number;
    measureWaist: number;
    measureLeg: number;
    date: Date;
  };
  statsHistory: {
    weight: number;
    height: number;
    measureBiceps: number;
    measureChest: number;
    measureHip: number;
    measureWaist: number;
    measureLeg: number;
    date: Date;
  }[];
}
