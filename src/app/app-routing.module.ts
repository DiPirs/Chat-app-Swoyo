import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSetupComponent } from './chat/user-setup/user-setup.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup',  component: UserSetupComponent},
  { path: 'chat',  component: ChatComponent}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
