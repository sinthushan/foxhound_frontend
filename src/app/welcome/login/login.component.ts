import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'dialog[applicantLogin]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username_val = '';
  password_val = '';

  


  @ViewChild('username') username!: NgModel;

  @ViewChild('password') password!: NgModel;

  
  errors = signal<string[]>([])
  url = "http://127.0.0.1:8000/api/v1/dj-rest-auth/login/"

  constructor(private elementRef: ElementRef) {}

  public get dialog(): HTMLDialogElement {
    return (this.elementRef.nativeElement as HTMLDialogElement);
  }


 
  async  loginUser() {
    this.errors.set([])
    const rawResponse = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username_val,
        password: this.password_val,

      })
    });
   
    console.log(rawResponse)
    if (!rawResponse.ok){
      const errorMsgs = await rawResponse.text().then(response => JSON.parse(response));
      for (let errorMsg in errorMsgs){
        this.errors.update(values =>{return [...values,errorMsgs[errorMsg]]})
      }
      
      return
    }
    const content = await rawResponse.json();
    console.log(content)
    this.dialog.close()
    this.username_val = '';
    this.password_val = '';
  }
}
