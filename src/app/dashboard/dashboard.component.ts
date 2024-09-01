import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { JobcanvasComponent } from './jobcanvas/jobcanvas.component';
import { User } from '../auth/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, JobcanvasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  auth = inject(AuthService)
  currentUser: User|null = null
  
  ngOnInit(): void {
    this.auth.getcurrentUser().subscribe({
      next:(res) => {
        this.currentUser = res  
      },
      error: (error) => {
          this.currentUser = null
          console.log(error);
      }
    });
   
  }
}
