import { ICoach } from '@/pages/coaches/types';

export interface CoachesState {
    lastFetch: null | string | number;
    coaches: ICoach[];
}