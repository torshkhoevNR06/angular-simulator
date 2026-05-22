import { UpperCasePipe } from '@angular/common';
import { PhoneNumberFormatting } from '../pipes/phone-number-formatting.pipe';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhoneMode } from '../enums/PhoneMode';
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
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  
  phoneMode: typeof PhoneMode = PhoneMode;

  onDeleteClick(id: number): void {
    this.deleteUser.emit(id);
  }
  
}