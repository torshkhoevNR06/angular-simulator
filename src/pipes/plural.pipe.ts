import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(x: string | number, ...args: string[]): (string | number)[] {
    const number: number = Number(x);
    
    if (number >= 1 && number < 2) {
      return [`${number}: ${args[0]}`];
    } else if (number >= 2 && number < 9) {
      return [`${number}: ${args[1]}`];
    } else {
      return [`${number}: ${args[2]}`];
    }
  }

}