import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private dark = signal(false);
  readonly darkMode = computed(() => this.dark());

  toggle() {
    this.dark.update(v => !v);
  }
}