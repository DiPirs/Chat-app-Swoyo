import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Импортируем CommonModule

import { MessageListComponent } from './message-list/message-list.component';
import { MessageFormComponent } from './message-form/message-form.component';

@Component({
  selector: 'app-chat',
  standalone: true, 
  templateUrl: './chat.component.html',
  imports: [
    CommonModule,
    MessageFormComponent,
    MessageListComponent
  ],
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
