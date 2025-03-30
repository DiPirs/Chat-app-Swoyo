import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})

export class MessageFormComponent {
  text = '';
  username = localStorage.getItem('username') || 'Anonymous';

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.text.trim()) {
      const message = {
        author: this.username,
        text: this.text,
        timestamp: new Date(),
      };
      this.chatService.addMessage(message);
      this.text = '';
    }
  }
}
