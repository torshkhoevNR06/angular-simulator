import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: string | number, ...args: string[]): (string | number) {
    const number: number = Number(value);
    
    if (number % 10 >= 1 && number % 10 < 2) {
      return `${ number }: ${ args[0] }`;
    } else if (number % 10 >= 2 && number % 10 < 9) {
      return `${ number }: ${ args[1] }`;
    } else {
      return `${ number }: ${ args[2] }`;
    }
  }

}