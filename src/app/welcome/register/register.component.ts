import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

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
  
  @ViewChild('username') username!: NgModel;

  @ViewChild('password') password!: NgModel;

  @ViewChild('confirm_password') confirm_password!: NgModel;
  
  errors = signal<string[]>([])
  url = "http://127.0.0.1:8000/api/v1/dj_-rest-auth/registration/"

  constructor(private elementRef: ElementRef) {}

  public get dialog(): HTMLDialogElement {
    return (this.elementRef.nativeElement as HTMLDialogElement);
  }

 
  async registerUser() {
    this.errors.set([])
    const rawResponse = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username_val,
        email: this.email_val, 
        password1: this.password_val,
        password2: this.password_confirm_val 
      })
    });
   
  
    if (!rawResponse.ok){
      const errorMsgs = await rawResponse.text().then(response => JSON.parse(response));
      for (let errorMsg in errorMsgs){
        this.errors.update(values =>{return [...values,errorMsgs[errorMsg]]})
      }
      
      return
    }
    const content = await rawResponse.json();
    this.dialog.close()
    this.username_val = '';
    this.email_val = '';
    this.password_val = '';
    this.password_confirm_val = '';
  }
} 
