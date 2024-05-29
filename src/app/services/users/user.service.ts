import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    private usersApiUrl: string = 'https://playezpro-server.onrender.com/user'

    constructor(private http: HttpClient) { }

    createUser(newUser: any): Observable<any> {
        const userData = {
            userName: newUser.userName,
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            password: newUser.password,
            repeatPassword: newUser.repeatPassword
        };
        return this.http.post('https://playezpro-server.onrender.com/auth/signup', userData)
    }

    loginUser(credentials: any): Observable<any> {
        const loginData = {
            email: credentials.email,
            password: credentials.password,
        };
        return this.http.post('https://playezpro-server.onrender.com/auth/signin', loginData)
    }

    getAllUsers(): Observable<any> {
        return this.http.get(this.usersApiUrl);
      }
    
      getUserById(userId: string): Observable<any> {
        return this.http.get(`${this.usersApiUrl}/${userId}`);
      }
    
      updateUser(userId: string, updatedUser: any): Observable<any> {
        return this.http.put(`${this.usersApiUrl}/${userId}`, updatedUser);
      }
    
      deleteUser(userId: string): Observable<any> {
        return this.http.delete(`${this.usersApiUrl}/${userId}`);
      }
      
}