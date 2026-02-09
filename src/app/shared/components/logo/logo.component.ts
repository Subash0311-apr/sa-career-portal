import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <a class="inline-flex items-center gap-3 no-underline group cursor-pointer" [class]="wrapperClass">
      <img
        src="assets/images/southernautomation_RGB_logo.jpg.jpeg"
        [alt]="'Southern Automation Logo'"
        class="object-contain transition-transform duration-300 group-hover:scale-105"
        [class]="sizeClass"
      />
    </a>
  `
})
export class LogoComponent {
  /** Predefined size variants */
  @Input() size: 'sm' | 'md' | 'lg' | 'llg' | 'xl' = 'md';
  /** Optional extra classes on the wrapper */
  @Input() wrapperClass = '';

  get sizeClass(): string {
    switch (this.size) {
      case 'sm': return 'h-8';
      case 'md': return 'h-10';
      case 'lg': return 'h-14';
      case 'llg': return 'h-16';
      case 'xl': return 'h-20';
    }
  }
}
