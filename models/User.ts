export interface User {
    email: string;
    role: string;
}

export interface IAuthContext {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}