export interface IRequest {
    id?: string;
    coachId?: string;
    message: string;
    userEmail: string;
}

export interface RequestsState {
    requests: IRequest[];
}