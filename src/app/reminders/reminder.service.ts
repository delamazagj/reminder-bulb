import { Reminder } from './../model/reminder.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RemindersService {
  private reminders: Reminder[] = [];
  private remindersUpdated = new Subject<Reminder[]>();
  private REMINDERS_LIST_URL = 'http://localhost:3000/api/v1/reminders';
  constructor(private http: HttpClient, private router: Router) {}

  getReminders() {
    this.http
      .get<{ message: string; reminders: any }>(this.REMINDERS_LIST_URL)
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

  getReminder(id: string) {
    return this.http.get<{ message: string; reminder: Reminder }>(
      this.REMINDERS_LIST_URL + '/' + id
    );
  }

  getReminderUpdateListener() {
    return this.remindersUpdated.asObservable();
  }

  addReminder(id: string, title: string, content: string) {
    const reminder: Reminder = { id: id, title: title, content: content };
    this.http
      .post<{ message: string; id: string }>(this.REMINDERS_LIST_URL, reminder)
      .subscribe(res => {
        console.log('Saved:', res.message);
        reminder.id = res.id;
        this.reminders.push(reminder);
        this.remindersUpdated.next([...this.reminders]);
        this.router.navigate(['/']);
      });
  }

  updateReminder(id: string, title: string, content: string) {
    this.http
      .put<{ message: string; id: string }>(
        this.REMINDERS_LIST_URL + '/' + id,
        { title: title, content: content }
      )
      .subscribe(res => {
        console.log('Updated:', res.id);
        this.router.navigate(['/']);
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
