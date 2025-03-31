import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('logsContainer') logsContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.chatService.messages$.subscribe((messages) => {
      this.ngZone.run(() => {
        this.messages = Array.isArray(messages) ? messages : [];
        this.scrollToBottom();
      });
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = this.logsContainer.nativeElement;
      container.scrollTop = container.scrollHeight; 
    }, 0);
  }
}
