import { Reminder } from './../../model/reminder.model';
import { RemindersService } from './../reminder.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mime-type.validator';

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
  form!: FormGroup;
  imagePreviewUrl!: string;

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
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.has('id') ? (params.get('id') as string) : '';
      if (this.id) {
        this.isLoading = true;
        this.remindersService.getReminder(this.id).subscribe(res => {
          this.reminder = res.reminder;
          this.form.setValue({
            title: this.reminder.title,
            content: this.reminder.content
          });
          console.log(this.reminder);
          this.isLoading = false;
        });
      }
    });
  }

  onUpdateReminder() {
    if (this.form.invalid) {
      return;
    }
    this.remindersService.updateReminder(
      this.reminder.id,
      this.form.value.title,
      this.form.value.content
    );
    this.form.reset();
  }

  onSaveReminder() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.id);
    if (!this.id) {
      console.log('Saving normally');
      this.remindersService.addReminder(
        this.reminder.id,
        this.form.value.title,
        this.form.value.content
      );
    } else {
      console.log('Updating normally');
      this.remindersService.updateReminder(
        this.reminder.id,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }

  onImageChanged($event: Event) {
    const inputEl = $event.target as HTMLInputElement;

    let image;
    if (inputEl.files) {
      image = inputEl.files[0];

      this.form.patchValue({ image: image });
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(image);
    }
  }
}
