import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Используем BehaviorSubject

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject для хранения массива сообщений
  messages$ = this.messagesSubject.asObservable();
  broadcastChannel = new BroadcastChannel('chat');

  constructor() {
    // Подписываемся на сообщения из других вкладок
    this.broadcastChannel.onmessage = (event) => {
      const message = event.data;
      console.log('Получено сообщение из другой вкладки:', message);
      this.addMessageToStream(message); // Добавляем сообщение в поток
    };

    // Загружаем сообщения из localStorage при инициализации
    let savedMessages: any[] = [];
    try {
      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        savedMessages = JSON.parse(storedMessages);
      }
    } catch (error) {
      console.error('Ошибка при загрузке сообщений из localStorage:', error);
    }

    console.log('Загружены сообщения из localStorage:', savedMessages);
    this.messagesSubject.next(savedMessages); // Отправляем загруженные сообщения в поток
  }

  addMessage(message: any) {
    console.log('Отправлено сообщение:', message);

    // Получаем текущие сообщения из потока
    const currentMessages = this.messagesSubject.value;

    // Добавляем новое сообщение
    const updatedMessages = [...currentMessages, message];

    // Ограничиваем количество сообщений до 50
    if (updatedMessages.length > 50) {
      updatedMessages.shift(); // Удаляем самое старое сообщение
    }

    // Обновляем поток и localStorage
    this.messagesSubject.next(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // Отправляем сообщение в другие вкладки
    this.broadcastChannel.postMessage(message);
  }

  private addMessageToStream(message: any) {
    // Получаем текущие сообщения из потока
    const currentMessages = this.messagesSubject.value;

    // Добавляем новое сообщение
    const updatedMessages = [...currentMessages, message];

    // Ограничиваем количество сообщений до 50
    if (updatedMessages.length > 50) {
      updatedMessages.shift(); // Удаляем самое старое сообщение
    }

    // Обновляем поток и localStorage
    this.messagesSubject.next(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  }
}