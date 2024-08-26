import { Component, ViewChild } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RegisterComponent, LoginComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  @ViewChild(RegisterComponent) registerModal!: RegisterComponent;
  
  @ViewChild(LoginComponent) loginModal!: LoginComponent;
  
  openRegister($event: MouseEvent) {

    this.registerModal.dialog.showModal()

  }

  openLogin($event: MouseEvent) {
    $event.preventDefault()
    this.loginModal.dialog.showModal()

  }

  closeDialog(event:MouseEvent){
    if(event?.target == this.registerModal.dialog){
      this.registerModal.dialog.close()
    }else if(event?.target == this.loginModal.dialog){
      this.loginModal.dialog.close()
    }
  }

  async getJobs() {

    const rawResponse = await fetch('http://127.0.0.1:8000/api/v1/jobs/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('SavedToken')}` ?? ''
      },
      
    });
   
    const content = await rawResponse.json();

  }

}
