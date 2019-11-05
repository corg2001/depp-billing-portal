import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatphone' })
export class FormatPhone implements PipeTransform {
  public transform(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ?  '(' + match[1] + ') ' + match[2] + '-' + match[3] : '';
  }
}
