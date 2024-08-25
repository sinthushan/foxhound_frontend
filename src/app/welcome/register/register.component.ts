import { Component, ElementRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dialog[applicantRegister]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = signal('')
  password = signal('')
  confirm_password = signal('')

  url = "http://127.0.0.1:8000/api/v1/dj_-rest-auth/registration/"

  constructor(private elementRef: ElementRef) {}

  public get dialog(): HTMLDialogElement {
    return (this.elementRef.nativeElement as HTMLDialogElement);
  }

 


  async registerUser() {
    const rawResponse = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.username(), password1: this.password(), password2: this.confirm_password()})
    });
    const tokenResponse = await fetch('http://127.0.0.1:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.username(), password: this.password()})
    })

    const content = await tokenResponse.json();


    localStorage.setItem("SavedToken", content['token']);
  }
}
