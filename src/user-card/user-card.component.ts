import { UpperCasePipe } from '@angular/common';
import { PhoneNumberFormatting } from '../pipes/phone-number-formatting.pipe';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NumberPhoneMode } from '../enums/NumberPhoneMode';
import { FontWeightDirective } from '../directives/font-weight.directive';
import { AnimatedBorderDirective } from '../directives/animated-border.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneNumberFormatting, FontWeightDirective, AnimatedBorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Input() borderConfiguration!: IBorderConfiguration;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  numberPhoneMode: typeof NumberPhoneMode = NumberPhoneMode;

  onDeleteClick(id: number): void {
    this.deleteUser.emit(id);
  }

}