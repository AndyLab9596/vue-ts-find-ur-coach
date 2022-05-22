export interface AuthState {
    userId: string | null;
    token: string | null;
    didAutoLogout: boolean;
}