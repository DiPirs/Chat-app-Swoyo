import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  template: `
  <div class="container">
    <app-user-setup></app-user-setup>
  </div>`
})
export class AppComponent {
  title = 'chat-app';
}
