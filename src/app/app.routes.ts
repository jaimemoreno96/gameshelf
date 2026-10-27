import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { BacklogPage } from './features/backlog/ui/backlog-page/backlog-page';
import { LoginPage } from './features/auth/ui/login-page/login-page';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'backlog',
        component: BacklogPage,
        // canActivate: [authGuard]
    }
];