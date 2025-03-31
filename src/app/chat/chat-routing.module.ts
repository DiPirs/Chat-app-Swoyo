import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { UserSetupComponent } from './user-setup/user-setup.component';

const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' }, 
  { path: 'setup', component: UserSetupComponent },      
  { path: 'chat', component: ChatComponent },           
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
