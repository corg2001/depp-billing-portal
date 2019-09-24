import { ValidDateRangeInterface } from '../interface/valid-date-range.interface';

export class ValidDateRange implements ValidDateRangeInterface {
  private _start: string;
  private _end: string;

  constructor(start: string, end: string) {
    this._start = start;
    this._end = end;
  }

  get start(): string {
    return this._start;
  }

  get end(): string {
    return this._end;
  }

  set start(newValue: string) {
    this._start = newValue;
  }

  set end(newValue: string) {
    this._end = newValue;
  }
}
