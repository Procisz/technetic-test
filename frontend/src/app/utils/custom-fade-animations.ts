import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [style({ width: 'auto', opacity: 0 }), animate('0.2s ease-out', style({ width: 'auto', opacity: 1 }))]),
  transition(':leave', [style({ width: 'auto', opacity: 1 }), animate('0.2s ease-in', style({ width: 'auto', opacity: 0 }))]),
]);
