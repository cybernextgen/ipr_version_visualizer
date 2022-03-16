import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  showStandard(text: string) {
    this.show(text);
  }

  showSuccess(text: string) {
    this.show(text, { classname: 'bg-success text-light' })
  }

  showDanger(text: string) {
    this.show(text, { classname: 'bg-danger text-light' });
  }

  show(text: string, options: object = {}) {
    this.toasts.push({ text, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
  constructor() { }
}
