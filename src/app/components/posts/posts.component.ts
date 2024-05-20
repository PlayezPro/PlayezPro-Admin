import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostServiceService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  posts: any[] = [];

  constructor(private postService: PostServiceService) { }

  async ngOnInit() {
    try {
      const response = await this.postService.getAllPost();
      this.posts = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

}
