import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Brush, Layers, ShieldCheck, Sparkles, Star, Syringe } from 'lucide-angular';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <section id="servicios" class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center space-y-4 mb-16">
          <p class="section-subtitle text-secondary/80">SERVICIOS</p>
          <h3 class="text-3xl md:text-5xl font-semibold">Curaduría de tatuajes y rituales de cuidado</h3>
          <p class="text-muted max-w-3xl mx-auto">
            Nuestra metodología combina arte, ciencia y comodidad para que vivas sesiones memorables. Estos son los programas que más reservan nuestros clientes.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          @for (service of services; track service.title) {
            <div class="relative overflow-hidden border border-border/40 bg-black/40 rounded-xl text-card-foreground shadow-sm">
              <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="flex items-center gap-3">
                  <div class="w-14 h-14 rounded-2xl border border-border/50 flex items-center justify-center">
                    <lucide-icon [name]="service.icon" class="w-6 h-6 text-secondary"></lucide-icon>
                  </div>
                  <div>
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">{{ service.title }}</h3>
                    <span class="text-xs uppercase tracking-[0.4em] text-secondary/80">{{ service.tag }}</span>
                  </div>
                </div>
              </div>
              <div class="p-6 pt-0">
                <p class="text-base text-muted leading-relaxed">
                  {{ service.description }}
                </p>
              </div>
            </div>
          }
        </div>

        <div class="mt-16 grid md:grid-cols-3 gap-6">
          @for (item of commitments; track item.label) {
            <div class="flex items-center gap-4 border border-border/40 rounded-2xl p-4 bg-black/30">
              <div class="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center">
                <lucide-icon [name]="item.icon" class="w-5 h-5 text-secondary"></lucide-icon>
              </div>
              <p class="text-sm uppercase tracking-[0.3em] text-muted">{{ item.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
    services = [
        {
            icon: Brush,
            title: "Custom Pieces",
            description:
                "Exploramos moodboards, ejecutamos bocetos digitales y ajustamos líneas y sombras hasta que la composición cuente tu historia.",
            tag: "Hecho a medida",
        },
        {
            icon: Layers,
            title: "Cover-up & Restyling",
            description:
                "Rediseñamos tatuajes anteriores con técnicas de saturación, texturas y volúmenes que camuflan y elevan el resultado final.",
            tag: "Transformación",
        },
        {
            icon: Syringe,
            title: "Piercing & Microtattoo",
            description:
                "Cabina estéril, agujas desechables y curación guiada. Ideal para piezas minimalistas y perforaciones de alta precisión.",
            tag: "Detalle",
        },
    ];

    commitments = [
        { icon: ShieldCheck, label: "Bioseguridad certificada" },
        { icon: Star, label: "Artistas residentes & guest" },
        { icon: Sparkles, label: "Aftercare personalizado" },
    ];
}
