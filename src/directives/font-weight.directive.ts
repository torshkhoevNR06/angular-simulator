import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[FontWeightHover]',
})
export class FontWeightDirective {

  @HostBinding('style.fontWeight') fontWeightText: string = '700';

  @HostListener('mouseenter')
  onEnter(): void {
    this.fontWeightText = '900';  
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeightText = '700';  
  }

}
