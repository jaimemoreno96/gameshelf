import { Injectable, inject, signal, Signal } from '@angular/core';
import { AuthError, AuthResponse, Session, User } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase.client';

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    email: string;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly isLoading = signal(true);
    readonly user = signal<User | null>(null);
    readonly session = signal<Session | null>(null);
    readonly error = signal<AuthError | null>(null);

    private readonly supabase = inject(SUPABASE_CLIENT);
    private resolveReady!: () => void;
    private readonly ready = new Promise<void>((resolve) => {
        this.resolveReady = resolve;
    });

    constructor() {
        void this.initialize();
    }

    private async initialize(): Promise<void> {
        const { data, error } = await this.supabase.auth.getSession();
        this.session.set(data.session);
        this.user.set(data.session?.user ?? null);
        this.error.set(error);
        this.isLoading.set(false);
        this.resolveReady();
        this.supabase.auth.onAuthStateChange((_event, session) => {
            this.session.set(session);
            this.user.set(session?.user ?? null);
        });
    }

    waitUntilReady(): Promise<void> {
        return this.ready;
    }

    async signInWithPassword(credentials: SignInCredentials): Promise<AuthResponse> {
        const response = await this.supabase.auth.signInWithPassword(credentials);
        this.session.set(response.data.session);
        this.user.set(response.data.user);
        this.error.set(response.error);
        return response;
    }

    async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
        const response = await this.supabase.auth.signUp(credentials);
        this.error.set(response.error);
        return response;
    }

    async signOut(): Promise<{ error: AuthError | null }> {
        const result = await this.supabase.auth.signOut();
        this.user.set(null);
        this.session.set(null);
        return result;
    }
}