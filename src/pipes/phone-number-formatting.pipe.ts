import { Pipe, PipeTransform } from '@angular/core';
import { NumberPhoneMode } from '../enums/NumberPhoneMode';

@Pipe({
  name: 'phoneNumbers',
})
export class PhoneNumberFormatting implements PipeTransform {

  transform(phoneNumber: string, numberMode: NumberPhoneMode): string {
    const formattedNumberPhone: string = phoneNumber.replace(/\D/g, '');

    const slice = (oneIndex: number, secondNumber: number): string => {
      return formattedNumberPhone.slice(oneIndex, secondNumber);
    }

    const formattedPartsString: string = `
      ${slice(0, 3)} 
      ${slice(3, 6)} 
      ${slice(6, 8)} 
      ${slice(8, 10)}`;

    switch (numberMode) {
      case NumberPhoneMode.COMPACT:
        return `+${formattedNumberPhone}`;

      case NumberPhoneMode.INTERNATIONAL:
        return `+505 ${formattedPartsString}`;

      case NumberPhoneMode.MASKED:
        return formattedPartsString;

      case NumberPhoneMode.NATIONAL:
        return `+505 
                ${slice(0, 3)} 
                ${slice(3, 8).replace(/\d/g, '*')} 
                ${slice(8, 10)}`;
                
      default:
        return phoneNumber;
    }
  }

}