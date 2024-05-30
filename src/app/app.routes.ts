import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { blockPage } from './guards/admin-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'posts',
        component: DashboardComponent,
        canActivate : [blockPage]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate : [blockPage]
    },
];
