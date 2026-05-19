import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../enums/PhoneMode';

@Pipe({
  name: 'phoneNumbers',
})
export class PhoneNumberFormatting implements PipeTransform {

  transform(phoneNumber: string, phoneMode: PhoneMode): string {
    const formattedNumberPhone: string = phoneNumber.replace(/\D/g, '');
    const slice = (oneIndex: number, secondIndex: number): string => {
      return formattedNumberPhone.slice(oneIndex, secondIndex);
    }

    const formattedPartsString: string = `
      ${ slice(0, 3) } 
      ${ slice(3, 6) } 
      ${ slice(6, 8) } 
      ${ slice(8, 10) }`;

    switch (phoneMode) {
      case PhoneMode.COMPACT:
        return `+${ formattedNumberPhone }`;

      case PhoneMode.INTERNATIONAL:
        return `+505 ${ formattedPartsString }`;

      case PhoneMode.MASKED:
        return formattedPartsString;

      case PhoneMode.NATIONAL:
        return `+505 
                ${ slice(0, 3) } 
                ${ slice(3, 8).replace(/\d/g, '*') } 
                ${ slice(8, 10) }`;
                
      default:
        return phoneNumber;
    }
  }

}