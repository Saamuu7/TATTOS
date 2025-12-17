import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedBackgroundComponent } from '../../shared/animated-background/animated-background.component';
import { WelcomeBannerComponent } from './welcome-banner/welcome-banner.component';
import { HeroComponent } from './hero/hero.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AnimatedBackgroundComponent, WelcomeBannerComponent, HeroComponent, GalleryComponent, ServicesComponent, ContactComponent, BookingFormComponent, FooterComponent],
  template: `
    <app-animated-background />
    <app-welcome-banner />
    <app-hero />
    <app-services />
    <app-gallery />
    <app-booking-form />
    <app-contact />
    <app-footer />
  `
})
export class HomeComponent { }
