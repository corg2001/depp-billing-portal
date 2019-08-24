import { Injectable } from '@angular/core';
import { WindowRefAbstract } from './window-ref.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService implements WindowRefAbstract{

  constructor() { }
  public get window(): any {
    return window;
  }
}
