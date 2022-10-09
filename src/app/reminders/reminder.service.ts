import { Reminder } from './../model/reminder.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemindersService {
  private reminders: Reminder[] = [];
  private remindersUpdated = new Subject<Reminder[]>();

  getReminders() {
    return [...this.reminders];
  }

  getReminderUpdateListener() {
    return this.remindersUpdated.asObservable();
  }

  addReminder(title: string, content: string) {
    const reminder: Reminder = { title: title, content: content };
    this.reminders.push(reminder);
    this.remindersUpdated.next([...this.reminders]);
  }
}
