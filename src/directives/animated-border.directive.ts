import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[animatedBorder]',
})
export class AnimatedBorderDirective {
  @Input() gradientConfiguration!: IBorderConfiguration;

  timerId!: number;

  @HostBinding('style.border') border: string = '';
  @HostBinding('style.borderRadius') borderRadius: string = '';
  @HostBinding('style.background') bgBorder: string = '';
  @HostBinding('style.animation') borderAnimation: string = '';

  @HostListener('mouseenter')
  onEffectBorder(): void {
    this.timerId = setTimeout(() => {
      this.borderRadius = '4px';
      this.border = `${ this.gradientConfiguration.thickness } solid #0000`;
      this.bgBorder = `
        linear-gradient(
          ${ this.gradientConfiguration.colors![2] }, 
          ${ this.gradientConfiguration.colors![2] }
        ) padding-box,
        linear-gradient(
          var(--angle),
          ${ this.gradientConfiguration.colors![2] }, 
          ${ this.gradientConfiguration.colors![0] }
        ) border-box`;
      this.borderAnimation = '8s rotate linear infinite';
    }, this.gradientConfiguration.delay);
  }

  @HostListener('mouseleave')
  offEffectBorder(): void {
    this.border = '';
    this.borderRadius = '';
    this.bgBorder = '';
    this.borderAnimation = '';
    clearTimeout(this.timerId);
  }
}
