import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPassword' })
export class FormatPassword implements PipeTransform {
  public transform(password: string): string {
    return password ? password.replace(/.()/g, '*') : '';
  }
}
