import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './services/dark-mode-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  private darkMode = signal<boolean>(false);
  protected readonly darkMode$ = computed(() => this.darkMode());
  
  constructor(private dm: DarkModeService) {
    effect(() => {
      const isDark = this.dm.darkMode();
      document.documentElement.classList.toggle('dark', isDark);
    });
  }

  toggleDark() {
    this.dm.toggle();
  }
}
