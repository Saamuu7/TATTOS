import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, Sparkles } from 'lucide-angular';
import { UiButtonDirective } from '../ui/ui-button.directive';
import { SheetComponent, SheetContentComponent, SheetTriggerDirective } from '../ui/sheet/sheet.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        LucideAngularModule,
        UiButtonDirective,
        SheetComponent,
        SheetContentComponent,
        SheetTriggerDirective
    ],
    template: `
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-[rgb(5,5,5,0.85)] backdrop-blur-2xl">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#inicio" class="flex items-center gap-3 group">
          <div class="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-primary font-semibold tracking-[0.3em] text-xs uppercase glint">
            NIS
          </div>
          <div>
            <p class="text-xs text-muted-foreground tracking-[0.4em] uppercase">Studio</p>
            <p class="text-lg font-semibold section-heading">Nocturna Ink</p>
          </div>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <nav class="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 text-sm font-medium">
            @for (item of navItems; track item.href) {
              <a
                [href]="item.href"
                class="relative text-muted-foreground uppercase tracking-[0.2em] hover:text-primary transition-colors after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all hover:after:w-full"
              >
                {{ item.label }}
              </a>
            }
          </nav>
          <a href="#reservas" uiButton class="uppercase tracking-[0.3em] flex items-center gap-2">
            <lucide-icon [name]="SparklesIcon" class="w-4 h-4"></lucide-icon>
            Agenda
          </a>
        </div>

        <!-- Mobile Nav -->
        <app-sheet>
            <button appSheetTrigger uiButton variant="outline" size="icon" class="md:hidden border-border/60 bg-transparent">
                <lucide-icon [name]="MenuIcon" class="h-5 w-5"></lucide-icon>
            </button>
            <app-sheet-content side="right" class="bg-background border-l border-border/40">
                <div class="mt-8 flex flex-col gap-8">
                    <nav class="flex flex-col gap-6 text-sm font-medium">
                        @for (item of navItems; track item.href) {
                            <a
                                [href]="item.href"
                                class="relative text-muted-foreground uppercase tracking-[0.2em] hover:text-primary transition-colors w-fit"
                            >
                                {{ item.label }}
                            </a>
                        }
                    </nav>
                    <a href="#reservas" uiButton class="flex items-center gap-2 w-full justify-center">
                        <lucide-icon [name]="SparklesIcon" class="w-4 h-4"></lucide-icon>
                        Reservar cita
                    </a>
                </div>
            </app-sheet-content>
        </app-sheet>
      </div>
    </header>
  `
})
export class HeaderComponent {
    readonly MenuIcon = Menu;
    readonly SparklesIcon = Sparkles;

    navItems = [
        { href: "#inicio", label: "Inicio" },
        { href: "#experiencia", label: "Experiencia" },
        { href: "#servicios", label: "Servicios" },
        { href: "#galeria", label: "Galería" },
        { href: "#contacto", label: "Contacto" },
    ];
}
