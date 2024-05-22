import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
<<<<<<< HEAD
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent,
=======
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
>>>>>>> 66e492b356e8b6118ee63565e6b3f7f50046e517
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
<<<<<<< HEAD
        path: 'users',
        component: UsersComponent
        // loadComponent: () => import('./components/users/users.component').then((m) => m.UsersComponent),
    },
    {
        path: 'posts',
        component: PostsComponent
        // loadComponent: () => import('./components/posts/posts.component').then((m) => m.PostsComponent),
    }
];

//Add guard protections
=======
        path: 'user',
        component: UsersComponent
    },
];
>>>>>>> 66e492b356e8b6118ee63565e6b3f7f50046e517
