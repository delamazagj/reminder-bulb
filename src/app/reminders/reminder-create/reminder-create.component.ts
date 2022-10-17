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
  isLoading = false;

  constructor(
    private remindersService: RemindersService,
    private route: ActivatedRoute
  ) {
    this.reminder = {
      id: '',
      title: '',
      content: ''
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.has('id') ? (params.get('id') as string) : '';
      if (this.id) {
        this.isLoading = true;
        this.remindersService.getReminder(this.id).subscribe(res => {
          this.reminder = res.reminder;
          console.log(this.reminder);
          this.isLoading = false;
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
    this.isLoading = true;
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
