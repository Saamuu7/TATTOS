import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, Video, ChevronDown } from 'lucide-angular';
import { UiButtonDirective } from '../../../shared/ui/ui-button.directive';

@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, UiButtonDirective],
  template: `
    <section id="inicio" class="relative min-h-screen w-full flex items-center overflow-hidden pt-32 pb-24">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1601572592091-3a8153fe8c46?q=80&w=1920"
          alt="Artista tatuando un brazo"
          class="w-full h-full object-cover"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/90"></div>
        <div class="noise-overlay"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 flex flex-col gap-8">
        <p class="text-sm md:text-base uppercase tracking-[0.6em] text-secondary/80 flex items-center gap-3">
          <span class="w-12 h-px bg-gradient-to-r from-transparent via-secondary/60 to-secondary"></span>
          Tattoo atelier contemporáneo
        </p>

        <div class="space-y-6">
          <h1 class="text-4xl md:text-6xl lg:text-7xl leading-tight font-semibold">
            Marcamos historias con trazos de <span class="text-gradient">tinta consciente</span>
          </h1>
          <p class="text-lg md:text-xl text-muted max-w-3xl">
            Diseños hechos a medida, higiene quirúrgica y un proceso creativo guiado por artistas que viven el tatuaje como ritual.
            Trae tu idea, nosotros la elevamos.
          </p>
        </div>

        <div class="flex flex-wrap gap-4">
          <a href="#reservas" uiButton size="lg" class="uppercase tracking-[0.4em] flex items-center gap-3">
            <lucide-icon [name]="SparklesIcon" class="w-5 h-5"></lucide-icon>
            Reserva tu cita
          </a>
          <a
            href="#galeria"
            uiButton
            size="lg"
            variant="outline"
            class="border-secondary/80 text-secondary hover:bg-secondary/10 uppercase tracking-[0.3em] flex items-center gap-3"
          >
            <lucide-icon [name]="VideoIcon" class="w-5 h-5"></lucide-icon>
            Ver portafolio
          </a>
        </div>

        <div class="grid grid-cols-3 gap-4 max-w-2xl">
          @for (stat of stats; track stat.label) {
            <div class="border border-border/60 rounded-2xl p-4 text-center bg-black/30">
              <p class="text-3xl font-semibold text-secondary">{{ stat.value }}</p>
              <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>

      <button
        (click)="handleScrollDown()"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-secondary transition-colors flex flex-col items-center gap-3"
        aria-label="Desplazar hacia experiencia"
      >
        <span class="text-xs uppercase tracking-[0.4em]">Explorar estudio</span>
        <div class="w-10 h-10 rounded-full border border-current flex items-center justify-center">
          <lucide-icon [name]="ChevronDownIcon" class="w-5 h-5 animate-bounce"></lucide-icon>
        </div>
      </button>
    </section>
  `
})
export class WelcomeBannerComponent {
  readonly SparklesIcon = Sparkles;
  readonly VideoIcon = Video;
  readonly ChevronDownIcon = ChevronDown;

  stats = [
    { label: "Años tatuando", value: "+12" },
    { label: "Clientes felices", value: "3.5K" },
    { label: "Estilos dominados", value: "9" },
  ];

  handleScrollDown() {
    const heroSection = document.getElementById("experiencia");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  }
}
