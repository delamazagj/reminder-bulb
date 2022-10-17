import { Reminder } from '../../model/reminder.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemindersService } from '../reminder.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit, OnDestroy {
  reminders: Reminder[] = [];
  isLoading = false;
  private remindersSub!: Subscription;

  constructor(public remindersService: RemindersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.remindersService.getReminders();
    this.remindersSub = this.remindersService
      .getReminderUpdateListener()
      .subscribe((reminders: Reminder[]) => {
        this.isLoading = false;
        this.reminders = reminders;
      });
  }

  onDeleteReminder(id: string) {
    this.remindersService.deleteReminder(id);
  }

  ngOnDestroy() {
    this.remindersSub.unsubscribe();
  }
}
