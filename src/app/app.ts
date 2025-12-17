import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgxSonnerToaster],
  template: `
    <app-header />
    <router-outlet />
    <ngx-sonner-toaster />
  `,
  styles: []
})
export class App {
  title = 'tatto-studio-angular';
}
