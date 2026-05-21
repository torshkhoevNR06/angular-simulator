import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../enums/PhoneMode';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberFormatting implements PipeTransform {

  transform(phoneNumber: string, phoneNumberMode: PhoneMode): string {
    const cleanPhoneNumber: string = phoneNumber.replace(/\D/g, '');
    const cutPhoneNumber = (oneIndex: number, secondIndex: number): string => {
      return cleanPhoneNumber.slice(oneIndex, secondIndex);
    }

    const formattedPartsString: string = `${ cutPhoneNumber(0, 2) } 
      ${ cutPhoneNumber(2, 5) } 
      ${ cutPhoneNumber(5, 8) } 
      ${ cutPhoneNumber(8, 10) } 
      ${ cutPhoneNumber(10, 12) }`;

    switch (phoneNumberMode) {
      case PhoneMode.COMPACT:
        return `+${ cleanPhoneNumber }`;

      case PhoneMode.INTERNATIONAL:
        return `+${ formattedPartsString }`;

      case PhoneMode.MASKED:
        return formattedPartsString;

      case PhoneMode.NATIONAL:
        return `+${ cutPhoneNumber(0, 2) } 
                 ${ cutPhoneNumber(2, 5) } 
                 ${ cutPhoneNumber(5, 10).replace(/\d/g, '*') } 
                 ${ cutPhoneNumber(10, 12) }`;
                
      default:
        return phoneNumber;
    }
  }

}