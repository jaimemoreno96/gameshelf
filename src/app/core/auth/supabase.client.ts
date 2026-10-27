import { inject, InjectionToken } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../config/supabase.config';
import { SUPABASE_STORAGE } from '../storage/ssr-safe.storage';

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>('SUPABASE_CLIENT');

export function supabaseClientFactory(): SupabaseClient {
    const config = inject(SUPABASE_CONFIG);
    const storage = inject(SUPABASE_STORAGE);
    return createClient(config.url, config.anonKey, {
        auth: {
            flowType: 'pkce',
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage,
        },
    });
}