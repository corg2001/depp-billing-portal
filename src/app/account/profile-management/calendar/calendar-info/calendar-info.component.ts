import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as dateFormat from 'dateformat';
import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';

@Component({
  selector: 'app-calendar-info',
  templateUrl: './calendar-info.component.html',
  styleUrls: ['./calendar-info.component.scss']
})
export class CalendarInfoComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  @Output() public dateChange: EventEmitter<string> = new EventEmitter<
    string
  >();

  public calendarVisible = true;
  public calendarPlugins = [dayGridPlugin, interactionPlugin];
  public calendarEvents: EventInput[] = [
    { title: '', start: dateFormat(new Date(), CalendarEnums.monthDayYear) }
  ];

  handleDateClick(arg: any) {
    this.calendarEvents = [
      {
        title: '',
        start: arg.date,
        allDay: arg.allDay
      }
    ];
    this.dateChange.emit(arg.date);
  }

  constructor() {}

  ngOnInit() {}
}
