import { inject, Injectable} from "@angular/core";
import { Registration, User } from "./user";

import { HttpClient } from "@angular/common/http";
import { Token } from "./toeknConfig";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService{
   
    private baseURL = 'http://127.0.0.1:8000/api/v1/';
    private registerURL = 'dj-rest-auth/registration/';
    private loginURL = 'dj-rest-auth/login/'
    private applicantURL = 'applicant/'

    private httpClient = inject(HttpClient);
    private router = inject(Router);



    register(registration: Registration){ 
        const url = this.baseURL + this.registerURL
        this.httpClient.post<Token>(
            url,
            registration
          ).subscribe({
            next:(res) => {
                this.router.navigateByUrl('/dashboard');
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    login({username, password}:{username:string, password:string}){
        const url = this.baseURL + this.loginURL
        this.httpClient.post<Token>(
            url,
            {
                username:username,
                password:password
            }
          ).subscribe({
            next:(res) => {
                localStorage.setItem('access_tkn',res.access);
                this.router.navigateByUrl('/dashboard');
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    getcurrentUser(): Observable<User|null>{
        const url = this.baseURL + this.applicantURL
        return this.httpClient.get<User>(url)
    }

}