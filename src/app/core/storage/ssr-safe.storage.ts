import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { SupportedStorage } from '@supabase/supabase-js';

export const SUPABASE_STORAGE = new InjectionToken<SupportedStorage>('SUPABASE_STORAGE');

export function ssrSafeStorageFactory(): SupportedStorage {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
        return {
            getItem: (key: string): string | null => window.localStorage.getItem(key),
            setItem: (key: string, value: string): void => {
                window.localStorage.setItem(key, value);
            },
            removeItem: (key: string): void => {
                window.localStorage.removeItem(key);
            },
        };
    }
    const store = new Map<string, string>();
    return {
        getItem: (key: string): string | null => store.get(key) ?? null,
        setItem: (key: string, value: string): void => {
            store.set(key, value);
        },
        removeItem: (key: string): void => {
            store.delete(key);
        },
    };
}