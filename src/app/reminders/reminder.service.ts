import { Reminder } from './../model/reminder.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RemindersService {
  private reminders: Reminder[] = [];
  private remindersUpdated = new Subject<Reminder[]>();
  private REMINDERS_LIST_URL = 'http://localhost:3000/api/v1/reminders';
  constructor(private http: HttpClient) {}

  getReminders() {
    this.http
      .get<{ message: String; reminders: any }>(this.REMINDERS_LIST_URL)
      .pipe(
        map(savedRem => {
          return savedRem.reminders.map((rem: any) => {
            return {
              title: rem.title,
              content: rem.content,
              id: rem._id
            };
          });
        })
      )
      .subscribe(modifiedRem => {
        this.reminders = modifiedRem;
        this.remindersUpdated.next([...this.reminders]);
      });
  }

  getReminderUpdateListener() {
    return this.remindersUpdated.asObservable();
  }

  addReminder(title: string, content: string) {
    const reminder: Reminder = { id: '', title: title, content: content };
    this.http
      .post<{ message: string; id: string }>(this.REMINDERS_LIST_URL, reminder)
      .subscribe(res => {
        console.log('Saved:', res.message);
        reminder.id = res.id;
        this.reminders.push(reminder);
        this.remindersUpdated.next([...this.reminders]);
      });
  }

  deleteReminder(id: string) {
    this.http
      .delete<{ message: string }>(this.REMINDERS_LIST_URL + '/' + id)
      .subscribe(res => {
        console.log('Deleted:', res.message);
        this.reminders = this.reminders.filter(rem => rem.id !== id);
        this.remindersUpdated.next([...this.reminders]);
      });
  }
}
