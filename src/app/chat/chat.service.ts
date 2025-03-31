import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();
  broadcastChannel = new BroadcastChannel('chat');

  constructor() {
    this.broadcastChannel.onmessage = (event) => {
      const message = event.data;
      this.addMessageToStream(message);
    };

    let savedMessages: any[] = [];
    try {
      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        savedMessages = JSON.parse(storedMessages);
      }
    } catch (error) {
      console.error('Ошибка при загрузке сообщений из localStorage:', error);
    }
    this.messagesSubject.next(savedMessages);
  }

  private removeMessageOverflow(updatedMessages: any) {
    if (updatedMessages.length > 50) {
      return updatedMessages.shift();
    }
  }

  addMessage(message: any) {
    const currentMessages = this.messagesSubject.value;

    const updatedMessages = [...currentMessages, message];

    this.removeMessageOverflow(updatedMessages);

    this.messagesSubject.next(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    this.broadcastChannel.postMessage(message);
  }

  private addMessageToStream(message: any) {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [...currentMessages, message];

    this.removeMessageOverflow(updatedMessages);

    this.messagesSubject.next(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  }
}