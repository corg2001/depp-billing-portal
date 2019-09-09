import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatmoney' })
export class FormatMoney implements PipeTransform {
  public transform(value: string): string {
    let num: number = 0;
    num = parseFloat(value);
    const convertToDollars: number = num / 100;
    const formatToDecimal: string = convertToDollars
      .toString()
    const convertToNumber: number = parseFloat(formatToDecimal);

    return convertToNumber.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}
