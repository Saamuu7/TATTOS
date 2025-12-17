import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Instagram, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-angular';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <footer class="relative mt-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black"></div>
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-10">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.5em] text-secondary/80">Nocturna Ink Studio</p>
          <p class="text-muted max-w-md">
            Un atelier boutique enfocado en tatuaje contemporáneo, higiene rigurosa y experiencias diseñadas para quienes buscan piezas memorables.
          </p>
          <a
            href="#reservas"
            class="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.4em] text-xs"
          >
            Agenda privada <lucide-icon [name]="ArrowUpRightIcon" class="w-4 h-4"></lucide-icon>
          </a>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <div>
            <p class="text-sm uppercase tracking-[0.4em] text-muted mb-4">Mapa</p>
            <nav class="flex flex-col gap-3 text-sm text-muted">
              @for (link of links; track link.href) {
                <a [href]="link.href" class="hover:text-secondary transition-colors">
                  {{ link.label }}
                </a>
              }
            </nav>
          </div>
          <div class="space-y-3 text-sm text-muted">
            <a href="tel:+34123456789" class="flex items-center gap-3 hover:text-secondary transition">
              <lucide-icon [name]="PhoneIcon" class="w-4 h-4 text-secondary"></lucide-icon> +34 123 456 789
            </a>
            <a href="mailto:info@nocturnaink.com" class="flex items-center gap-3 hover:text-secondary transition">
              <lucide-icon [name]="MailIcon" class="w-4 h-4 text-secondary"></lucide-icon> info@nocturnaink.com
            </a>
            <p class="flex items-start gap-3">
              <lucide-icon [name]="MapPinIcon" class="w-4 h-4 mt-0.5 text-secondary"></lucide-icon> Calle Principal 123 · Madrid
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.4em] text-muted">Síguenos</p>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center hover:border-secondary"
            >
              <lucide-icon [name]="InstagramIcon" class="w-5 h-5"></lucide-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-border/40 relative z-10">
        <div class="max-w-7xl mx-auto px-4 py-6 text-sm text-muted flex flex-col md:flex-row gap-3 justify-between">
          <p>© {{ currentYear }} Nocturna Ink Studio. Todos los derechos reservados.</p>
          <p>Diseño, técnica y cuidado en cada sesión.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
    readonly InstagramIcon = Instagram;
    readonly MapPinIcon = MapPin;
    readonly PhoneIcon = Phone;
    readonly MailIcon = Mail;
    readonly ArrowUpRightIcon = ArrowUpRight;

    currentYear = new Date().getFullYear();

    links = [
        { href: "#inicio", label: "Inicio" },
        { href: "#experiencia", label: "Experiencia" },
        { href: "#servicios", label: "Servicios" },
        { href: "#galeria", label: "Galería" },
        { href: "#reservas", label: "Reservas" },
    ];
}
