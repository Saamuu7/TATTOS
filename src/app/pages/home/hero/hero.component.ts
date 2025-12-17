import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, MessageCircle, Clock, Phone, PenLine } from 'lucide-angular';
import { UiButtonDirective } from '../../../shared/ui/ui-button.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, UiButtonDirective],
  template: `
    <section id="experiencia" class="relative overflow-hidden py-24">
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.03)] to-transparent pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div class="space-y-8">
          <div class="badge-ornament text-xs tracking-[0.5em] uppercase text-secondary/80">
            Diseño · Ritual · Técnica
          </div>

          <div class="space-y-6">
            <h2 class="text-4xl md:text-5xl font-semibold leading-tight">
              Experiencias de tatuaje orquestadas con precisión artística
            </h2>
            <p class="text-lg text-muted max-w-xl">
              Cada proyecto inicia con una entrevista sensorial, moodboards y un proceso colaborativo que respeta la anatomía y el significado del tatuaje. Nuestro objetivo: piezas atemporales con acabados impecables.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <a href="#reservas" uiButton size="lg" class="uppercase tracking-[0.4em] flex items-center gap-2">
              <lucide-icon [name]="SparklesIcon" class="w-4 h-4"></lucide-icon>
              Agenda tu cita
            </a>
            <a
              href="https://wa.me/34123456789"
              target="_blank"
              rel="noreferrer"
              uiButton
              variant="outline"
              size="lg"
              class="border-border/60 uppercase tracking-[0.3em] flex items-center gap-2"
            >
              <lucide-icon [name]="MessageCircleIcon" class="w-4 h-4"></lucide-icon>
              WhatsApp
            </a>
          </div>

          <div class="grid gap-4">
            @for (pillar of pillars; track pillar.title) {
              <div class="glass rounded-2xl p-4 border border-border/40">
                <p class="text-sm uppercase tracking-[0.3em] text-secondary/80">{{ pillar.title }}</p>
                <p class="text-muted mt-1 text-sm">{{ pillar.copy }}</p>
              </div>
            }
          </div>

          <div class="flex flex-wrap gap-4 text-sm text-muted">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
                <lucide-icon [name]="ClockIcon" class="w-4 h-4 text-secondary"></lucide-icon>
              </div>
              Lun - Vie · 10h - 20h
            </div>
            <a href="tel:+34123456789" class="flex items-center gap-2 hover:text-secondary transition-colors">
              <div class="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
                <lucide-icon [name]="PhoneIcon" class="w-4 h-4 text-secondary"></lucide-icon>
              </div>
              +34 123 456 789
            </a>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-6 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl opacity-70"></div>
          <div class="relative grid gap-4">
            @for (src of heroImages; track src; let i = $index) {
              <div
                class="relative overflow-hidden rounded-3xl border border-border/40 bg-black/30"
                [class.ml-8]="i === 1"
              >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <img [src]="src" [alt]="'Tatuaje destacado ' + (i + 1)" class="w-full h-64 object-cover" />
                <div class="absolute bottom-4 left-4 text-sm">
                  <p class="uppercase tracking-[0.4em] text-xs text-muted">Serie #{{ i + 1 }}</p>
                  <p class="text-white font-semibold">Curaduría Nocturna</p>
                </div>
              </div>
            }

            <div class="p-6 rounded-3xl border border-border/40 bg-black/40 backdrop-blur">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center">
                  <lucide-icon [name]="PenLineIcon" class="w-5 h-5 text-secondary"></lucide-icon>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.4em] text-muted">Proceso</p>
                  <p class="font-semibold">Brief · Boceto · Ritual</p>
                </div>
              </div>
              <p class="text-sm text-muted">
                Documentamos cada paso para que vivas una sesión segura y memorable. Desde la preparación de la piel hasta las instrucciones de cuidado final, todo está calculado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly SparklesIcon = Sparkles;
  readonly MessageCircleIcon = MessageCircle;
  readonly ClockIcon = Clock;
  readonly PhoneIcon = Phone;
  readonly PenLineIcon = PenLine;

  heroImages = [
    "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=800",
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800",
    "https://images.unsplash.com/photo-1598371611186-ccae61a2f93e?q=80&w=800",
  ];

  pillars = [
    {
      title: "Diseño consciente",
      copy: "Brief creativo, bocetos digitales y revisión conjunta hasta cerrar cada trazo.",
    },
    {
      title: "Cabina estéril",
      copy: "Protocolos hospitalarios, materiales desechables y certificaciones vigentes.",
    },
    {
      title: "Acompañamiento",
      copy: "Aftercare detallado y seguimiento para asegurar una curación impecable.",
    },
  ];
}
