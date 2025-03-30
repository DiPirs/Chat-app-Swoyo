import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-setup',
  standalone: true, 
  templateUrl: './user-setup.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './user-setup.component.css'
})
export class UserSetupComponent {
  username = '';

  constructor(private router: Router) {}

  saveUsername() {
    if (this.username.trim()) {
      localStorage.setItem('username', this.username);
      this.router.navigate(['/chat']);
    }
  }
}
