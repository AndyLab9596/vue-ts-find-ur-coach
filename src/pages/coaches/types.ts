export interface ICoach {
    id: string;
    description: string;
    firstName: string;
    hourlyRate: number;
    lastName: string;
    areas: string[];
}

export interface IFilters {
    [x: string]: boolean
}