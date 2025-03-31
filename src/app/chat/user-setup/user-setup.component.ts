import { Component, OnInit } from '@angular/core';
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

export class UserSetupComponent implements OnInit {
  username = '';
  errorMessage = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.router.navigate(['/chat']);
    }
  }

  saveUsername() {
    if (this.username.trim()) {
      localStorage.setItem('username', this.username);
      this.router.navigate(['/chat']);
    } else {
      this.errorMessage = 'Введите имя или никнейм.';
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.value.length > 38) {
      this.errorMessage = 'Никнейм не может быть длиннее 38 символов.';
      this.username = input.value.slice(0, 38);
      input.value = this.username;
    } else {
      this.errorMessage = '';
      this.username = input.value;
    }
  }
}
