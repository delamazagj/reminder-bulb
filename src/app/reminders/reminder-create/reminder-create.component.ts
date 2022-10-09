import { RemindersService } from './../reminder.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public remindersService: RemindersService) {}

  onAddReminder(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.remindersService.addReminder(form.value.title, form.value.content);
    form.resetForm();
  }
}
