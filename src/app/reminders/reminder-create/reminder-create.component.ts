import { Reminder } from './../../model/reminder.model';
import { RemindersService } from './../reminder.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.scss']
})
export class ReminderCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  id!: string;
  reminder!: Reminder;

  constructor(
    private remindersService: RemindersService,
    private router: ActivatedRoute
  ) {
    this.reminder = {
      id: '',
      title: '',
      content: ''
    };
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.id = params.has('id') ? (params.get('id') as string) : '';
      if (this.id) {
        this.remindersService.getReminder(this.id).subscribe(res => {
          this.reminder = res.reminder;
          console.log(this.reminder);
        });
      }
    });
  }

  onUpdateReminder(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.remindersService.updateReminder(
      this.reminder.id,
      form.value.title,
      form.value.content
    );
    form.resetForm();
  }

  onSaveReminder(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.id);
    if (!this.id) {
      console.log('Saving normally');
      this.remindersService.addReminder(
        this.reminder.id,
        form.value.title,
        form.value.content
      );
    } else {
      console.log('Updating normally');
      this.remindersService.updateReminder(
        this.reminder.id,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
