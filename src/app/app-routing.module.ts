import { ReminderCreateComponent } from './reminders/reminder-create/reminder-create.component';
import { ReminderListComponent } from './reminders/reminder-list/reminder-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReminderListComponent },
  { path: 'create', component: ReminderCreateComponent },
  { path: 'edit/:id', component: ReminderCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
