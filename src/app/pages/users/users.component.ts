import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UsersService } from '../../services/users/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  selectedUser: any = null;
  userIdToDelete: string | null = null;

  constructor(private userService: UsersService) {}

  async ngOnInit() {
    this.GetAllUsers();
  }

  async GetAllUsers() {
    try {
      this.userService.getAllUsers().subscribe(
        (users: any[]) => {
          this.users = users;
        }
      );
    } catch (error) {
      console.error('Error en GetAllUsers:', error);
    }
  }

  openEditModal(user: any) {
    this.selectedUser = { ...user }; // Clonar el usuario seleccionado
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.selectedUser = null;
  }

  openDeleteModal(userId: string) {
    this.userIdToDelete = userId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.userIdToDelete = null;
  }

  reloadPage() {
    window.location.reload();
  }

  updateUser() {
    this.userService.updateUser(this.selectedUser._id, this.selectedUser).subscribe(
      (updatedUser: any) => {
        // Actualizar el usuario en la lista
        const index = this.users.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.closeModal();
        this.reloadPage();
      },
      (error: any) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  confirmDelete() {
    if (this.userIdToDelete) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(
        () => {
          // Eliminar el usuario de la lista después de borrarlo exitosamente
          this.users = this.users.filter(u => u._id !== this.userIdToDelete);
          console.log('Usuario eliminado:', this.userIdToDelete);
          this.closeDeleteModal();
          this.reloadPage();
        },
        (error: any) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }
}
