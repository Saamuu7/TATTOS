import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule, CalendarDays, ClipboardList, Phone, User } from 'lucide-angular';

interface ReservaEntry {
    nombre: string;
    email?: string;
    telefono: string;
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
    descripcion: string;
    createdAt?: string;
}

const STORAGE_KEY = "reservas_tattoo";

@Component({
    selector: 'app-agenda-board',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, DatePipe],
    template: `
    <section id="agenda" class="relative py-24 min-h-screen">
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
      <div class="max-w-6xl mx-auto px-4 relative z-10 space-y-10">
        <header class="text-center space-y-3">
          <p class="section-subtitle text-secondary/80">Agenda del estudio</p>
          <h3 class="text-3xl md:text-4xl font-semibold">Control interno de citas confirmadas</h3>
          <p class="text-muted max-w-2xl mx-auto">
            Esta vista muestra las solicitudes recibidas mediante el formulario de reservas. Usa la información para planificar tu semana y dar seguimiento a cada cliente.
          </p>
        </header>

        <div class="grid gap-6 md:grid-cols-3">
          <div class="bg-black/40 border border-border/40 rounded-xl p-6 shadow-sm">
            <div class="flex flex-col space-y-1.5">
               <h3 class="text-sm uppercase tracking-[0.3em] text-muted">Total citas</h3>
               <p class="text-4xl font-semibold text-secondary">{{ reservas().length }}</p>
            </div>
          </div>
          <div class="bg-black/40 border border-border/40 rounded-xl p-6 shadow-sm">
            <div class="flex flex-col gap-1">
              <h3 class="text-sm uppercase tracking-[0.3em] text-muted">Próxima fecha</h3>
              <div class="flex items-center gap-2 text-lg">
                <lucide-icon [name]="CalendarDaysIcon" class="w-5 h-5 text-secondary"></lucide-icon>
                <div class="flex flex-col">
                  <span>{{ nextReservaDisplay() }}</span>
                  @if (nextReserva()) {
                    <span class="text-sm text-muted">
                        {{ formatSlot(nextReserva()?.horaInicio, nextReserva()?.horaFin) }}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
          <div class="bg-black/40 border border-border/40 rounded-xl p-6 shadow-sm">
             <div class="flex flex-col gap-1">
              <h3 class="text-sm uppercase tracking-[0.3em] text-muted">Última solicitud</h3>
              <div class="text-lg">
                {{ reservas()[0]?.nombre ?? "Sin registros" }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-border/40 bg-black/40 rounded-xl shadow-sm">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
               <lucide-icon [name]="ClipboardListIcon" class="w-5 h-5 text-secondary"></lucide-icon>
               Agenda consolidada
            </h3>
            <p class="text-sm text-muted">
               Los clientes aparecen en el orden en que reservaron. Prioriza los que tienen fecha confirmada.
            </p>
          </div>
          <div class="p-6 pt-0">
            @if (sortedReservas().length === 0) {
              <div class="text-center text-muted py-10">
                Aún no hay registros. Cuando recibas reservas mediante el formulario, aparecerán aquí automáticamente.
              </div>
            } @else {
              <div class="overflow-x-auto">
                <table class="w-full caption-bottom text-sm">
                  <thead class="[&_tr]:border-b">
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 min-w-[160px]">Cliente</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Contacto</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Fecha preferida</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Horario</th>
                      <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Idea</th>
                    </tr>
                  </thead>
                  <tbody class="[&_tr:last-child]:border-0">
                    @for (reserva of sortedReservas(); track reserva.createdAt) {
                      <tr class="border-b border-border/30 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                           <div class="flex items-center gap-2">
                              <lucide-icon [name]="UserIcon" class="w-4 h-4 text-secondary"></lucide-icon>
                              {{ reserva.nombre }}
                           </div>
                        </td>
                        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                           <div class="flex flex-col text-xs uppercase tracking-[0.2em] text-muted">
                            <span class="flex items-center gap-2 text-sm normal-case">
                              <lucide-icon [name]="PhoneIcon" class="w-4 h-4 text-secondary"></lucide-icon>
                              {{ reserva.telefono }}
                            </span>
                            @if (reserva.email) { <span>{{ reserva.email }}</span> }
                          </div>
                        </td>
                        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            {{ reserva.fecha | date:'mediumDate' }}
                        </td>
                        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm font-medium">
                           {{ formatSlot(reserva.horaInicio, reserva.horaFin) }}
                        </td>
                        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-muted max-w-[240px]">
                            {{ reserva.descripcion }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class AgendaBoardComponent implements OnInit, OnDestroy {
    readonly CalendarDaysIcon = CalendarDays;
    readonly ClipboardListIcon = ClipboardList;
    readonly PhoneIcon = Phone;
    readonly UserIcon = User;

    reservas = signal<ReservaEntry[]>([]);

    sortedReservas = computed(() => {
        return [...this.reservas()].sort((a, b) => this.getComparableDate(a).getTime() - this.getComparableDate(b).getTime());
    });

    nextReserva = computed(() => {
        return this.sortedReservas().find((reserva) => this.parseDate(reserva.fecha));
    });

    nextReservaDisplay = computed(() => {
        const next = this.nextReserva();
        if (!next || !next.fecha) return "Sin definir";
        return new Date(next.fecha).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
    });

    ngOnInit() {
        this.loadReservas();
        window.addEventListener("reservas:update", this.loadReservas);
        window.addEventListener("storage", this.loadReservas);
    }

    ngOnDestroy() {
        window.removeEventListener("reservas:update", this.loadReservas);
        window.removeEventListener("storage", this.loadReservas);
    }

    loadReservas = () => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            if (Array.isArray(stored)) {
                this.reservas.set(stored);
            }
        } catch (error) {
            console.error("No se pudo leer la agenda", error);
        }
    };

    parseDate(value?: string) {
        if (!value) return null;
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    buildDateTimeString(fecha?: string, hora?: string) {
        if (!fecha) return null;
        return hora ? `${fecha}T${hora}` : fecha;
    }

    getComparableDate(reserva: ReservaEntry) {
        const composed = this.buildDateTimeString(reserva.fecha, reserva.horaInicio);
        return this.parseDate(composed ?? reserva.fecha) ?? this.parseDate(reserva.createdAt) ?? new Date(0);
    }

    formatSlot(start?: string, end?: string) {
        if (start && end) return `${start} - ${end}`;
        if (start) return `${start} hrs`;
        if (end) return `${end} hrs`;
        return "Sin horario";
    }
}
