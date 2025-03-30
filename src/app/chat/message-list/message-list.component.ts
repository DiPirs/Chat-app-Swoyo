import { Component, OnInit, NgZone } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})

export class MessageListComponent implements OnInit {
  messages: any[] = [];
  username = localStorage.getItem('username') || 'Anonymous';

  constructor(
    private chatService: ChatService,
    private ngZone: NgZone // Внедряем NgZone
  ) {}

  ngOnInit() {
    // Подписываемся на новые сообщения
    this.chatService.messages$.subscribe((messages) => {
      console.log('Получен массив сообщений:', messages);

      this.ngZone.run(() => {
        // Обновляем массив сообщений внутри Angular-зоны
        this.messages = Array.isArray(messages) ? messages : [];
      });
    });
  }
}
