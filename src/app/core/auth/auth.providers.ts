import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SUPABASE_CONFIG, supabaseConfigFactory } from '../config/supabase.config';
import { SUPABASE_STORAGE, ssrSafeStorageFactory } from '../storage/ssr-safe.storage';
import { SUPABASE_CLIENT, supabaseClientFactory } from './supabase.client';

export function provideSupabase(): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: SUPABASE_CONFIG, useFactory: supabaseConfigFactory },
        { provide: SUPABASE_STORAGE, useFactory: ssrSafeStorageFactory },
        { provide: SUPABASE_CLIENT, useFactory: supabaseClientFactory },
    ]);
}