import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Camera, Sparkles } from 'lucide-angular';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <section id="galeria" class="relative py-24">
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p class="section-subtitle text-secondary/80">Galería</p>
            <h3 class="text-3xl md:text-5xl font-semibold">Selección curada de piezas recientes</h3>
            <p class="text-muted max-w-2xl mt-4">
              Piezas blackwork, microrealismo, neo trad y japonesa. Cada sesión es documentada para que puedas revivirla y compartirla.
            </p>
          </div>
          <div class="flex items-center gap-3 text-sm text-muted">
            <lucide-icon [name]="CameraIcon" class="w-5 h-5 text-secondary"></lucide-icon>
            Sesiones fotográficas con iluminación editorial.
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <!-- Featured Image (First Item) -->
          <div class="md:row-span-2 relative rounded-[32px] overflow-hidden border border-border/40">
            <img [src]="galleryImages[0]" alt="Tatuaje destacado" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6">
              <p class="text-xs uppercase tracking-[0.4em] text-muted">Serie roja</p>
              <p class="text-2xl font-semibold">Sombras orgánicas</p>
            </div>
          </div>

          <!-- Other Images -->
          @for (src of galleryImages.slice(1); track src; let i = $index) {
            <div class="group relative overflow-hidden rounded-3xl border border-border/30 bg-black/40">
              <img [src]="src" [alt]="'Tattoo ' + (i + 2)" class="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute bottom-4 left-4">
                <p class="text-xs uppercase tracking-[0.4em] text-muted">Pieza #{{ i + 2 }}</p>
                <p class="text-sm font-semibold">Colección Ink Atlas</p>
              </div>
            </div>
          }
        </div>

        <div class="mt-10 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.4em] text-muted">
          <span class="inline-flex items-center gap-2">
            <lucide-icon [name]="SparklesIcon" class="w-4 h-4 text-secondary"></lucide-icon> Blackwork
          </span>
          <span>Neo Trad</span>
          <span>Realismo</span>
          <span>Fine line</span>
        </div>
      </div>
    </section>
  `
})
export class GalleryComponent {
    readonly CameraIcon = Camera;
    readonly SparklesIcon = Sparkles;

    galleryImages = [
        "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=800",
        "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800",
        "https://images.unsplash.com/photo-1598371611186-ccae61a2f93e?q=80&w=800",
        "https://images.unsplash.com/photo-1590246814883-57c511f1e5a6?q=80&w=800",
        "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=800",
        "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=800",
    ];
}
