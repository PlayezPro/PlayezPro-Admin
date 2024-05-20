import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostServiceService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  selectedPost: any = null;
  showModal: boolean = false;
  editedPost: any = {}

  isImage(file: string): boolean {
    const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)(\?.*)?$/i.test(file);
    return isImage;
  }

  constructor(private postService: PostServiceService) { }

  async ngOnInit() {
    this.loadPosts();
  }

  
  async loadPosts() {
    try {
      this.posts = await this.postService.getAllPost();
      // Obtener la información del usuario asociado a cada post
      for (const post of this.posts) {
        post.user = await this.postService.getUserById(post.users_id);
      }
    } catch (error) {
      console.error('Error al cargar los posts:', error);
    }
  }
  

  openEditModal(post: any) {
    this.selectedPost = post;
    this.editedPost = { ...post }; // Asignar una copia del post seleccionado a editedPost
    this.showModal = true;
  }

  async savePost(updatedPost: any) {
    try {
      await this.postService.editPost(this.selectedPost.id, updatedPost);
      this.showModal = false;
      this.loadPosts(); // Recarga los posts después de la edición
    } catch (error) {
      console.error(`Error al editar el post con id ${this.selectedPost.id}:`, error);
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedPost = null;
  }

  async deletePost(postId: number) {
    try {
      await this.postService.deletePost(postId);
      this.loadPosts(); // Recarga los posts después de borrar uno
    } catch (error) {
      console.error(`Error al borrar el post con id ${postId}:`, error);
    }
  }
}