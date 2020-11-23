import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-occasion',
  templateUrl: './new-occasion.component.html',
  styleUrls: ['./new-occasion.component.scss'],
  providers: [DatePipe],
})
export class NewOccasionComponent implements OnInit {
  addHoliday: FormGroup;
  selectedDate: any;
  todayDate: Date = new Date();
  occasionDate: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private datepipe: DatePipe,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public newData: any
  ) {}

  ngOnInit(): void {
    this.occasionDate = this.newData.holidayDate;
    this.formInit();
  }

  onSelect(event: any) {
    this.selectedDate = event;
  }

  /**
   * filter to disable weekends
   * @param event
   */
  myFilter(event: moment.Moment): boolean {
    const day = moment(event).weekday();
    return day !== 0 && day !== 6;
  }

  formInit(): void {
    this.addHoliday = this.fb.group({
      date: ['', [Validators.required]],
      occassion: ['', [Validators.required]],
    });
    if (this.occasionDate) {
      this.addHoliday
        .get('date')
        ?.patchValue(this.datepipe.transform(this.occasionDate, 'dd/MM/yyyy'));
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  /**
   * save holiday occasion
   */
  saveHoliday(): void {
    if (this.addHoliday.valid) {
      this.addHoliday.value.date = this.occasionDate;
      this.dialogRef.close(this.addHoliday.value);
    } else {
      console.log('Fill All fields');
    }
  }
}
