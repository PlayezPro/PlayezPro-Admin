<<<<<<< HEAD
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
// import { UsersComponent } from '../../components/users/users.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
=======
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostServiceService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [NavbarComponent, CommonModule, FormsModule],
>>>>>>> 66e492b356e8b6118ee63565e6b3f7f50046e517
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  selectedPost: any = null;
  showModal: boolean = false;
  showDeleteModal: boolean = false; // Agrega esta variable
  editedPost: any = {}

<<<<<<< HEAD
  
=======
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
      await this.postService.editPost(this.selectedPost._id, updatedPost);
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

  openDeleteModal(post: any) { // Función para abrir el modal de confirmación de eliminación
    this.selectedPost = post;
    this.showDeleteModal = true;
  }

  async confirmDelete() { // Función para confirmar la eliminación del post
    try {
      await this.postService.deletePost(this.selectedPost._id);
      this.loadPosts(); // Recarga los posts después de borrar uno
      this.closeDeleteModal();
    } catch (error) {
      console.error(`Error al borrar el post con id ${this.selectedPost._id}:`, error);
    }
  }

  closeDeleteModal() { // Función para cerrar el modal de confirmación de eliminación
    this.showDeleteModal = false;
    this.selectedPost = null;
  }
>>>>>>> 66e492b356e8b6118ee63565e6b3f7f50046e517
}
