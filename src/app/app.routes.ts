import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate : [AdminAuthGuard]
    },
];
