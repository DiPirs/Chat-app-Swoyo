import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Импортируем CommonModule

@Component({
  selector: 'app-chat',
  standalone: true, 
  templateUrl: './chat.component.html',
  imports: [CommonModule],
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
