import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToCurrencyAbbr',
  standalone: true,
})
export class NumberToCurrencyAbbrPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currencySymbol = '$',
    abbr = 'M',
  ): string {
    if (!value) {
      return '';
    }

    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) {
      return '';
    }

    return `${currencySymbol}${num}${abbr}`;
  }
}
