import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private postsApiUrl: string = 'https://playezpro-server.onrender.com/posts'
  private usersApiUrl: string = 'https://playezpro-server.onrender.com/user'

  constructor() { }

  async CreatePost(newPost: any): Promise<any> {
    const formData = new FormData();
    formData.append('users_id', newPost.users_id);
    formData.append('title', newPost.title);
    formData.append('description', newPost.description);
    formData.append('category', newPost.category);

    // Obtén el primer archivo seleccionado
    const fileInput = (<HTMLInputElement>document.querySelector('input[type="file"]'));
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();

      // Lee el contenido del archivo como un búfer de datos
      fileReader.onload = async (event: any) => { // Marca la función como async
        const fileBuffer = event.target.result;
        const blob = new Blob([fileBuffer]);
        formData.append('file', blob, file.name);

        console.log('FormData enviado al servidor:');
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        try {
          const response = await axios.post(this.postsApiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Asegúrate de establecer el encabezado adecuado para FormData
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };

      fileReader.readAsArrayBuffer(file);
    }
  }

  async getAllPost(): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.postsApiUrl);
      const posts = response.data;

      // Iterar sobre los posts y obtener la información del usuario para cada users_id
      const postsWithUsers = await Promise.all(posts.map(async (post) => {
        const user = await this.getUserById(post.users_id);
        return {
          ...post,
          user
        };
      }));
      return postsWithUsers;
    } catch (error) {
      console.error('Error al obtener los posts:', error);
      throw error;

    }
  }


  async getUserById(userId: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${this.usersApiUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el usuario con id ${userId}:`, error);
      throw error;
    }
  }

  async editPost(postId: number, updatedPost: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.put(`${this.postsApiUrl}/${postId}`, updatedPost);
      return response.data;
    } catch (error) {
      console.error(`Error al editar el post con id ${postId}:`, error);
      throw error;
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      await axios.delete(`${this.postsApiUrl}/${postId}`);
    } catch (error) {
      console.error(`Error al borrar el post con id ${postId}:`, error);
      throw error;
    }
  }

}