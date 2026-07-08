import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientConfiguration } from '../interface/IGradientConfiguration';

@Directive({
  selector: '[animatedBorder]'
})
export class AnimatedBorderDirective {
  
  @Input() gradientConfiguration: IGradientConfiguration = { 
    delay: 1000, 
    colors: ['#f2be22', '#7c19b1', '#131219'],
    thickness: '2px'
  };

  timerId!: number;
  delay: number = this.gradientConfiguration.delay!;
  thickness: string = this.gradientConfiguration.thickness!;
  colors: string[] = this.gradientConfiguration.colors!;

  @HostBinding('style.border') border: string = '';
  @HostBinding('style.borderRadius') borderRadius: string = '';
  @HostBinding('style.background') bgBorder: string = '';
  @HostBinding('style.animation') borderAnimation: string = '';

  @HostListener('mouseenter')
  onEffectBorder(): void {
    this.timerId = setTimeout(() => {
      this.borderRadius = '4px';
      this.border = `${ this.thickness } solid #0000`;
      this.bgBorder = `
        linear-gradient(${ this.colors[2] }, ${ this.colors[2] }) padding-box,
        linear-gradient(
          var(--angle), ${ this.colors[2] }, ${ this.colors[0] }
        ) border-box`;
      this.borderAnimation = '8s rotate linear infinite';
    }, this.delay);
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