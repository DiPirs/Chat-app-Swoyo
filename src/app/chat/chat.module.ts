import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';

import { UserSetupComponent } from './user-setup/user-setup.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageListComponent } from './message-list/message-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule,
    UserSetupComponent,
    MessageFormComponent,
    MessageListComponent
  ]
})
export class ChatModule { }
