import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[AnimatedBorder]',
})
export class AnimatedBorderDirective {
  
  @Input() GradientConfiguration!: IBorderConfiguration;

  timerID!: number;

  @HostBinding('style.border') border: string = '';
  @HostBinding('style.borderRadius') borderRadius: string = '';
  @HostBinding('style.background') bgBorder: string = '';
  @HostBinding('style.animation') borderAnimation: string = '';

  @HostListener('mouseenter')
  onEffectBorder(): void {
    this.timerID = setTimeout(() => {
      this.borderRadius = this.GradientConfiguration.thickness = '4px';
      this.border = `${this.GradientConfiguration.thickness} solid #0000`;
      this.bgBorder = `
        linear-gradient(
          ${this.GradientConfiguration.colors![2]}, 
          ${this.GradientConfiguration.colors![2]}
        ) padding-box,
        linear-gradient(
          var(--angle), 
          ${this.GradientConfiguration.colors![2]}, 
          ${this.GradientConfiguration.colors![0]}
        ) border-box`;
      this.borderAnimation = '8s rotate linear infinite';
      }, this.GradientConfiguration.delay);
    }
    
  @HostListener('mouseleave')
  offEffectBorder(): void {
    this.border = '';
    this.borderRadius = '';
    this.bgBorder = '';
    this.borderAnimation = '';
    clearTimeout(this.timerID);
  }

}