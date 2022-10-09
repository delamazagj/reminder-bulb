import { Reminder } from '../../model/reminder.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemindersService } from '../reminder.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit, OnDestroy {
  reminders: Reminder[] = [];
  private remindersSub!: Subscription;

  constructor(public remindersService: RemindersService) {}

  ngOnInit() {
    this.reminders = this.remindersService.getReminders();
    this.remindersSub = this.remindersService
      .getReminderUpdateListener()
      .subscribe((reminders: Reminder[]) => {
        this.reminders = reminders;
      });
  }

  ngOnDestroy() {
    this.remindersSub.unsubscribe();
  }
}
