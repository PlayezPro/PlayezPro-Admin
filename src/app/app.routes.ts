import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
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