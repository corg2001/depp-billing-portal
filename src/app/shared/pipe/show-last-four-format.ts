import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: false, name: 'formatLastFour' })
export class FromatLastFour implements PipeTransform {
  public transform(value: string) {
    return value === 'null' ? '' : value.replace(/.(?=.{4})/g, '*');
  }
}
