import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: any[] = [];
  username = localStorage.getItem('username') || 'Anonymous';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe((message) => {
      this.messages.push(message);
    });
  }
}
