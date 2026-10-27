import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface SupabaseConfig {
    url: string;
    anonKey: string;
}

export const SUPABASE_CONFIG = new InjectionToken<SupabaseConfig>('SUPABASE_CONFIG');

export function supabaseConfigFactory(): SupabaseConfig {
    return {
        url: environment.supabaseUrl,
        anonKey: environment.supabaseAnonKey,
    };
}