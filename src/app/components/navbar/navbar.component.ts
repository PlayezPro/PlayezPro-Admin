import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute, RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { PostsComponent } from '../posts/posts.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UsersComponent, PostsComponent, RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isPostsActive: boolean = false;
  isUsersActive: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const path = url[0].path;
      this.isPostsActive = path === 'posts';
      this.isUsersActive = path === 'users';
    });
  }

  NavigateToUsers() {
    this.router.navigate(['/users']);
  }

  NavigateToPosts() {
    this.router.navigate(['/posts']);
  }

  LogOut() {
    localStorage.removeItem('token de admin');
    this.router.navigate(['']);
  }
}