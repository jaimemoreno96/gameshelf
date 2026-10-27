import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (_route, state): Promise<boolean | UrlTree> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    await authService.waitUntilReady();
    if (authService.user()) {
        return true;
    }
    return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
    });
};