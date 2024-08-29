import { HttpClient } from '@angular/common/http';

import { Component, ElementRef,  inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ConnectConfig, map } from 'rxjs';
import { Token } from '../../auth/toeknConfig';

@Component({
  selector: 'dialog[applicantRegister]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username_val = '';
  email_val = '';
  password_val = '';
  password_confirm_val = '';
  
  private httpClient = inject(HttpClient)

  @ViewChild('username') username!: NgModel;

  @ViewChild('password') password!: NgModel;

  @ViewChild('confirm_password') confirm_password!: NgModel;
  
  errors = signal<string[]>([])
  url = "http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/"

  constructor(private elementRef: ElementRef) {}

  public get dialog(): HTMLDialogElement {
    return (this.elementRef.nativeElement as HTMLDialogElement);
  }


 
  registerUser() {
    console.log("called register")
    this.httpClient.post<Token>(this.url,
      {
        username: this.username_val,
        email: this.email_val, 
        password1: this.password_val,
        password2: this.password_confirm_val 
      }
    ).subscribe({
      next:(res) => {
        this.dialog.close()
        
        this.username_val = '';
        this.email_val = '';
        this.password_val = '';
        this.password_confirm_val = '';
        console.log(res.access)
        console.log(res.user)
      },
      error: (error) => {console.log(error)}
    })
  }
} 
