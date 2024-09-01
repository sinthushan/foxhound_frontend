import { Component, ElementRef,  inject } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { passwordMatch } from './passwordmatch.validator';

@Component({
  selector: 'dialog[applicantRegister]',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
  formBuilder = inject(FormBuilder);
  auth = inject(AuthService);
  
  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  },
  {
    validators: passwordMatch
  });
  

  constructor(private elementRef: ElementRef) {}

  public get dialog(): HTMLDialogElement {
    return (this.elementRef.nativeElement as HTMLDialogElement);
  }
  registerUser(){
    this.auth.register(this.form.getRawValue());
    this.form.reset();
    this.dialog.close();
  }
 
} 
