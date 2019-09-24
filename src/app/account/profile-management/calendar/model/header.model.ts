import { HeaderInterfacce } from '../interface/header.interface';

export class Header implements HeaderInterfacce {
  private _left: string;
  private _center: string;
  private _right: string;
  constructor(left: string, center: string, right: string) {
      this._left = left;
      this._center = center;
      this._right = right;
  }

  get left(): string {
      return this._left;
  }

  get center(): string {
      return this._center;
  }

  get right(): string {
      return this._right;
  }

  set left(newValue: string){
      this._left = newValue;
  }

  set center(newValue: string) {
    this._center = newValue;
  }

  set right(newValue: string) {
      this._right = newValue;
  }
}
