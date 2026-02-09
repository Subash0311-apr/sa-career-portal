import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="fixed top-20 right-4 z-[100] flex flex-col gap-2 min-w-[300px]">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="animate-slide-in-right rounded-lg px-4 py-3 shadow-lg text-white text-sm font-medium flex items-center justify-between gap-3"
             [class]="getToastClass(toast.type)">
          <div class="flex items-center gap-2">
            <span class="material-icons-outlined text-lg">{{ getIcon(toast.type) }}</span>
            <span>{{ toast.message }}</span>
          </div>
          <button (click)="toastService.dismiss(toast.id)"
                  class="text-white/80 hover:text-white cursor-pointer bg-transparent border-none">
            <span class="material-icons-outlined text-base">close</span>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  getToastClass(type: string): string {
    const base = 'backdrop-blur-sm';
    switch (type) {
      case 'success': return `${base} bg-green-600`;
      case 'error': return `${base} bg-red-600`;
      case 'warning': return `${base} bg-yellow-600`;
      default: return `${base} bg-sa-blue`;
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}
