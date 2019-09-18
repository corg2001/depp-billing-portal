import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as dateFormat from 'dateformat';

@Component({
  selector: 'app-calender-info',
  templateUrl: './calender-info.component.html',
  styleUrls: ['./calender-info.component.scss']
})
export class CalenderInfoComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  @Output() public onDateChange: EventEmitter<string> = new EventEmitter<string>();

  public calendarVisible = true;
  public calendarPlugins = [dayGridPlugin, interactionPlugin];
  public calendarEvents: EventInput[] = [
    { title: 'Date Selected', start: dateFormat(new Date(), 'dd/mm/yyyy') }
  ];

  handleDateClick(arg) {
    this.calendarEvents = [{ // add new event data. must create new array
      title: 'Date Selected',
      start: arg.date,
      allDay: arg.allDay
    }];
    console.log(dateFormat(arg.date, 'dd/mm/yyyy'));
    this.onDateChange.emit(dateFormat(arg.date, 'dd/mm/yyyy'));
  }

  constructor() { }

  ngOnInit() {
  }

}
