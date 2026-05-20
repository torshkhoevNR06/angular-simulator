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

    const formattedPartsString: string = `    
      ${ cutPhoneNumber(0, 3) } 
      ${ cutPhoneNumber(3, 6) } 
      ${ cutPhoneNumber(6, 8) } 
      ${ cutPhoneNumber(8, 10) }`;

    switch (phoneNumberMode) {
      case PhoneMode.COMPACT:
        return `+${ cleanPhoneNumber }`;

      case PhoneMode.INTERNATIONAL:
        return `+505 ${ formattedPartsString }`;

      case PhoneMode.MASKED:
        return formattedPartsString;

      case PhoneMode.NATIONAL:
        return `+505 
                ${ cutPhoneNumber(0, 3) } 
                ${ cutPhoneNumber(3, 8).replace(/\d/g, '*') } 
                ${ cutPhoneNumber(8, 10) }`;
                
      default:
        return phoneNumber;
    }
  }

}