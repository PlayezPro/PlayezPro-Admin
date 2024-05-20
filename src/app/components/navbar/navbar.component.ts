import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { PostsComponent } from '../posts/posts.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UsersComponent, PostsComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor (private router: Router) {}

  NavigateToUsers() {this.router.navigate(['/users'])}
  NavigateToPosts() {this.router.navigate(['/posts'])}
  LogOut(){
    localStorage.removeItem('token de admin')
    this.router.navigate(['/'])
  }

}
