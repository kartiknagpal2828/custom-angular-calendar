import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCalendarCellCssClasses,
  MatCalendar,
} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { NewOccasionComponent } from './new-occasion/new-occasion.component';

export interface DialogData {
  date: Date;
  occassion: string;
}

export interface Holiday {
  date: Date;
  occassion: string;
  dateMoment?: Moment;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  occasion: string | undefined;
  selectedDate: any;
  holidays: Holiday[] = [];
  disableAddHolidays: boolean = true;
  disableRemoveHolidays: boolean = true;
  date = new Date();
  today: Date = new Date();
  datesToHighlight: boolean = true;
  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

  constructor(private dialog: MatDialog) {
    this.getHolidays();
  }

  ngOnInit(): void {}

  /**
   * getting occasion of the selected date
   * @param event
   */
  onSelect(event: moment.Moment) {
    const d = event.format('YYYY-MM-DD');
    this.selectedDate = d;
    this.getOccasion();
  }

  /**
   * filter the weekends
   * @param event
   */
  dateFilter(event: moment.Moment): boolean {
    const day = moment(event).weekday();
    return day !== 0 && day !== 6;
  }

  disableControl() {
    const today = new Date();
    const dateSelected = new Date(this.selectedDate);
    if (dateSelected < today) {
      this.disableAddHolidays = true;
      this.disableRemoveHolidays = true;
    }
  }

  /**
   * get all the holidays
   */
  getHolidays() {
    this.calendar?.updateTodaysDate();
    this.datesToHighlight = false;
    this.datesToHighlight = true;
    this.rerenderEvent();
    this.getOccasion();
  }

  /**
   * apply different css class on special dates
   */
  dateClass() {
    return (date: moment.Moment): MatCalendarCellCssClasses => {
      const highlightDate = this.holidays.some((holiday) =>
        holiday.dateMoment?.isSame(date, 'day')
      );
      return highlightDate ? 'special-date' : '';
    };
  }

  rerenderEvent() {
    this.calendar?.updateTodaysDate();
  }

  /**
   * add a new holiday
   */
  addHoliday(): void {
    const dialogRef = this.dialog.open(NewOccasionComponent, {
      data: {
        holidayDate: this.selectedDate,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newOccasion = {} as Holiday;
        newOccasion.date = result.date;
        newOccasion.occassion = result.occassion;
        this.holidays.push(newOccasion);
      }
      this.getHolidays();
    });
  }

  /**
   * remove an existing holiday
   */
  removeHoliday() {
    const d = this.selectedDate;
    const c = this.holidays.find((i) => i.date === d)?.date;
    delete this.holidays[this.holidays.findIndex((item) => item.date == c)];
    console.log(this.holidays);
    this.getHolidays();
  }

  /**
   * get occasion of the selected date
   */
  getOccasion() {
    const d = this.selectedDate;
    const c = this.holidays.find((i) => i.date === d)?.date;
    if (c !== undefined) {
      this.disableAddHolidays = true;
      this.disableRemoveHolidays = false;
      this.disableControl();
      this.occasion = this.holidays.find((i) => i.date === c)?.occassion;
    } else {
      this.disableRemoveHolidays = true;
      if (this.selectedDate) {
        this.disableAddHolidays = false;
      }
      this.disableControl();
      this.occasion = '';
    }
  }
}
