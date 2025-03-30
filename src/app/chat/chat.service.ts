import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject = new Subject<any>();
  messages$ = this.messagesSubject.asObservable(); 
  broadcastChannel = new BroadcastChannel('chat'); 

  constructor() {
    this.broadcastChannel.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };

    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    savedMessages.forEach((message: any) => this.messagesSubject.next(message));
  }

  addMessage(message: any) {
    this.messagesSubject.next(message);

    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    this.broadcastChannel.postMessage(message);
  }
}