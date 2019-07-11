import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public add(): void {
    console.log('action: new notification !!!');
  }
}
