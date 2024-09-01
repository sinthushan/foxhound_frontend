import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'dialog[applicantLogin]',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  formBuilder = inject(FormBuilder);
  auth = inject(AuthService);

  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(private elementRef: ElementRef) {}

  public get dialog(): HTMLDialogElement {
    return (this.elementRef.nativeElement as HTMLDialogElement);
  }


 
  async  loginUser() {
    this.auth.login(this.form.getRawValue());
    this.form.reset();
    this.dialog.close()
  }
}
