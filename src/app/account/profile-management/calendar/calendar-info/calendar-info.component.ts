import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as dateFormat from 'dateformat';
import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';
import * as moment from 'moment';
import { ValidDateRange } from '../model/valid-date-range.model';
import { Header } from '../model/header.model';

@Component({
  standalone: false,
  selector: 'app-calendar-info',
  templateUrl: './calendar-info.component.html',
  styleUrls: ['./calendar-info.component.scss']
})
export class CalendarInfoComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent; 
  @Output() public dateChange: EventEmitter<string> = new EventEmitter<
    string
  >();

  public calendarVisible = true;
  public calendarPlugins = [dayGridPlugin, interactionPlugin];
  public calendarEvents: EventInput[] = [
    { title: '', start: dateFormat(new Date(), CalendarEnums.monthDayYear) }
  ];
  public validRange: ValidDateRange;
  public header: Header;
  public calendarOptions: any = {};

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

  ngOnInit() {

    // get today
    const startDate = dateFormat(moment(), CalendarEnums.yearMonthDay);
    // get  60 days from today
    const endDate = dateFormat(
      moment().add(60, 'd'),
      CalendarEnums.yearMonthDay
    );

    // designs the placements of the buttons and title
    this.header = this._buildHeader('prev', 'title', 'next');
    this.validRange = this._getValidDateRage(startDate, endDate);
    
    // Configure FullCalendar v6 options
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: this.header.left,
        center: this.header.center,
        right: this.header.right
      },
      validRange: {
        start: this.validRange.start,
        end: this.validRange.end
      },
      plugins: this.calendarPlugins,
      events: this.calendarEvents,
      dateClick: this.handleDateClick.bind(this)
    };
  }

  private _getValidDateRage(startDate: string, endDate: string): ValidDateRange {
    const validDateRange = new ValidDateRange(startDate, endDate);
    return validDateRange;
  }

  private _buildHeader(left: string, center: string, right: string): Header {
    const header = new Header(left, center, right);
    return header;
  }
}
