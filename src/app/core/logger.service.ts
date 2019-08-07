import { Injectable } from '@angular/core';


enum MessageTypes {
  message = 'MESSAGE',
  error = 'ERROR',
  important = 'IMPORTANT',
  action = 'ACTION'
}


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private isProd: boolean;

  constructor() {
    // TODO get this value from a configuration service;
    this.isProd = false;
  }

  public log(message: string): void {
    if ( this.isProd ) {
      return;
    }
    console.log(`${message}`);
  }

  public action(message: string): void {
    if ( this.isProd ) {
      return;
    }
    console.log(`${MessageTypes.action} - ${message}`);
  }

  public error(message: string): void {
    if (this.isProd) {
      return;
    }
    const date: Date = this.getDate();
    console.log(`${MessageTypes.error} - ${message} at: ${date}.`);
  }

  public important(message: string): void {
    if (this.isProd) {
      return;
    }
    const date: Date = this.getDate();
    console.log(`${MessageTypes.important} - ${message} at: ${date}.`);
  }

  private getDate(): Date {
    return new Date();
  }
}
