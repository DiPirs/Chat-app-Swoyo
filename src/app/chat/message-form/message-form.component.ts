import { Component, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../chat.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  text = '';
  username = localStorage.getItem('username') || 'Anonymous';

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>; // Получаем ссылку на <textarea>

  constructor(
    private chatService: ChatService,
    private ngZone: NgZone, // Внедряем NgZone
    private cdr: ChangeDetectorRef // Внедряем ChangeDetectorRef
  ) {}

  sendMessage() {
    if (this.text.trim()) {
      const message = {
        author: this.username,
        text: this.text,
        timestamp: new Date(),
      };
      this.chatService.addMessage(message);
      this.text = ''; // Очищаем поле после отправки

      // Принудительно обновляем интерфейс
      this.cdr.detectChanges();

      // Вызываем adjustHeight через setTimeout
      this.ngZone.run(() => {
        setTimeout(() => {
          this.adjustHeight();
        }, 0);
      });
    }
  }

  adjustHeight() {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем новую высоту
  }
}