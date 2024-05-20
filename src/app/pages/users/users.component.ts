import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UsersService } from '../../services/users/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: any[] = []

  constructor(private userService: UsersService) { }

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

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        // Eliminar el usuario de la lista después de borrarlo exitosamente
        this.users = this.users.filter(u => u._id !== userId);
        console.log('Usuario eliminado:', userId);
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
  

}
