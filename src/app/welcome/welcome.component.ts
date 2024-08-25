import { Component, ViewChild } from '@angular/core';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  @ViewChild(RegisterComponent) registerModal!: RegisterComponent;
  
  onClick($event: MouseEvent) {
    console.log(this.registerModal)
    this.registerModal.dialog.showModal()

  }

  async getJobs() {
    console.log(localStorage.getItem('SavedToken'))
    const rawResponse = await fetch('http://127.0.0.1:8000/api/v1/jobs/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('SavedToken')}` ?? ''
      },
      
    });
   
    const content = await rawResponse.json();
    console.log(content)
  }

}
