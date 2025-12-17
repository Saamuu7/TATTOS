import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Sparkles, User, Phone, Mail, Calendar, Clock, Send, MessageSquare } from 'lucide-angular';
import { UiButtonDirective } from '../../../shared/ui/ui-button.directive';
import { toast } from 'ngx-sonner';

interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    descripcion: string;
}

@Component({
    selector: 'app-booking-form',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule, UiButtonDirective],
    template: `
    <section id="reservas" class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>
      <div class="absolute -top-32 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 left-10 w-48 h-48 bg-primary/15 rounded-full blur-3xl"></div>

      <div class="max-w-5xl mx-auto px-4 relative z-10">
        <div class="text-center space-y-4 mb-14">
          <p class="section-subtitle text-secondary/80">Agenda</p>
          <h3 class="text-3xl md:text-5xl font-semibold">Reserva tu ritual de tatuaje</h3>
          <p class="text-muted max-w-3xl mx-auto">
            Responde este formulario para que podamos asesorarte con disponibilidad, estimado de tiempo y recomendaciones previas a la sesión.
          </p>
        </div>

        <div class="glass border-border/40 overflow-hidden relative rounded-xl">
          <div class="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 pointer-events-none"></div>
          <div class="p-6 pb-0 relative">
            <h3 class="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
              <lucide-icon [name]="SparklesIcon" class="w-6 h-6 text-secondary"></lucide-icon>
              Agenda privada
            </h3>
            <p class="text-base text-muted mt-2">
              Respondemos en menos de 24h vía WhatsApp o llamada para confirmar detalles.
            </p>
          </div>
          <div class="p-6 relative">
            <form (ngSubmit)="handleSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="nombre" class="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <lucide-icon [name]="UserIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    [(ngModel)]="form.nombre"
                    placeholder="Tu nombre completo"
                    class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass border-border/50 focus:border-primary md:text-sm"
                    [class.border-destructive]="errors.nombre"
                  />
                  @if (errors.nombre) {
                    <p class="text-destructive text-sm">{{ errors.nombre }}</p>
                  }
                </div>

                <div class="space-y-2">
                  <label for="telefono" class="flex items-center gap-2 text-sm font-medium leading-none">
                    <lucide-icon [name]="PhoneIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    [(ngModel)]="form.telefono"
                    placeholder="+34 6xx xxx xxx"
                    class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base glass border-border/50 focus:border-primary md:text-sm"
                    [class.border-destructive]="errors.telefono"
                  />
                  @if (errors.telefono) {
                    <p class="text-destructive text-sm">{{ errors.telefono }}</p>
                  }
                </div>

                <div class="space-y-2">
                  <label for="email" class="flex items-center gap-2 text-sm font-medium leading-none">
                    <lucide-icon [name]="MailIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Email (opcional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    [(ngModel)]="form.email"
                    placeholder="tu@email.com"
                    class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base glass border-border/50 focus:border-primary md:text-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label for="fecha" class="flex items-center gap-2 text-sm font-medium leading-none">
                    <lucide-icon [name]="CalendarIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Fecha preferida
                  </label>
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    [(ngModel)]="form.fecha"
                    class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base glass border-border/50 focus:border-primary md:text-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label for="horaInicio" class="flex items-center gap-2 text-sm font-medium leading-none">
                    <lucide-icon [name]="ClockIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Hora inicio *
                  </label>
                  <input
                    id="horaInicio"
                    name="horaInicio"
                    type="time"
                    [(ngModel)]="form.horaInicio"
                    class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base glass border-border/50 focus:border-primary md:text-sm"
                    [class.border-destructive]="errors.horaInicio"
                  />
                   @if (errors.horaInicio) {
                    <p class="text-destructive text-sm">{{ errors.horaInicio }}</p>
                  }
                </div>

                <div class="space-y-2">
                  <label for="horaFin" class="flex items-center gap-2 text-sm font-medium leading-none">
                    <lucide-icon [name]="ClockIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Hora fin *
                  </label>
                  <input
                    id="horaFin"
                    name="horaFin"
                    type="time"
                    [(ngModel)]="form.horaFin"
                    class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base glass border-border/50 focus:border-primary md:text-sm"
                    [class.border-destructive]="errors.horaFin"
                  />
                   @if (errors.horaFin) {
                    <p class="text-destructive text-sm">{{ errors.horaFin }}</p>
                  }
                </div>

                <div class="md:col-span-2 space-y-2">
                  <label for="descripcion" class="flex items-center gap-2 text-sm font-medium leading-none">
                    <lucide-icon [name]="SparklesIcon" class="w-4 h-4 text-primary"></lucide-icon>
                    Descripción de la idea *
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    [(ngModel)]="form.descripcion"
                    rows="4"
                    placeholder="Cuéntanos los detalles: tamaño aproximado, ubicación en el cuerpo, estilo preferido, referencias o inspiración..."
                    class="flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-base glass border-border/50 focus:border-primary resize-none md:text-sm"
                     [class.border-destructive]="errors.descripcion"
                  ></textarea>
                   @if (errors.descripcion) {
                    <p class="text-destructive text-sm">{{ errors.descripcion }}</p>
                  }
                </div>
              </div>

              <div class="flex flex-wrap gap-4 pt-4">
                <button
                  type="submit"
                  uiButton
                  size="lg"
                  [disabled]="isSubmitting"
                  class="shadow-lg hover:shadow-xl transition-all pulse-glow flex items-center gap-2"
                >
                  <ng-container *ngIf="isSubmitting; else sendIcon">
                    <div class="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Enviando...
                  </ng-container>
                  <ng-template #sendIcon>
                    <lucide-icon [name]="SendIcon" class="w-4 h-4"></lucide-icon>
                    Enviar reserva
                  </ng-template>
                </button>

                <a
                  [href]="whatsappUrl"
                  target="_blank"
                  rel="noreferrer"
                  uiButton
                  variant="outline"
                  size="lg"
                  class="glass border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 group flex items-center gap-2"
                >
                   <lucide-icon [name]="MessageSquareIcon" class="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform"></lucide-icon>
                   Reservar por WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
})
export class BookingFormComponent {
    readonly SparklesIcon = Sparkles;
    readonly UserIcon = User;
    readonly PhoneIcon = Phone;
    readonly MailIcon = Mail;
    readonly CalendarIcon = Calendar;
    readonly ClockIcon = Clock;
    readonly SendIcon = Send;
    readonly MessageSquareIcon = MessageSquare;

    internalEmail = "agenda@inkforge.fake";
    emailEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(this.internalEmail)}`;

    initialFormState: FormData = {
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        descripcion: "",
    };

    form: FormData = { ...this.initialFormState };
    errors: Partial<FormData> = {};
    isSubmitting = false;

    get whatsappUrl() {
        return `https://wa.me/34123456789?text=${encodeURIComponent(
            "Hola, quiero reservar una cita para un tatuaje"
        )}`;
    }

    validate(): Partial<FormData> {
        const newErrors: Partial<FormData> = {};
        if (!this.form.nombre.trim()) newErrors.nombre = "Ingresa tu nombre.";
        if (!this.form.telefono.trim()) newErrors.telefono = "Ingresa un teléfono.";
        if (!this.form.horaInicio.trim()) newErrors.horaInicio = "Indica hora de inicio.";
        if (!this.form.horaFin.trim()) newErrors.horaFin = "Indica hora de fin.";
        if (!newErrors.horaInicio && !newErrors.horaFin && this.form.horaInicio && this.form.horaFin && this.form.horaInicio >= this.form.horaFin) {
            newErrors.horaFin = "La hora de fin debe ser posterior.";
        }
        if (!this.form.descripcion.trim())
            newErrors.descripcion = "Cuéntanos la idea del tatuaje.";
        return newErrors;
    }

    async notifyInternalTeam(payload: FormData): Promise<boolean> {
        try {
            const body = {
                nombre: payload.nombre,
                telefono: payload.telefono,
                email: payload.email || "Sin email",
                fecha: payload.fecha || "Pendiente",
                horaInicio: payload.horaInicio,
                horaFin: payload.horaFin,
                descripcion: payload.descripcion,
                _subject: `Nueva reserva de ${payload.nombre}`,
                _template: "table",
            };

            const response = await fetch(this.emailEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Email request failed");
            }
            return true;
        } catch (error) {
            console.error("No se pudo enviar el correo interno", error);
            return false;
        }
    }

    async handleSubmit() {
        this.errors = this.validate();
        if (Object.keys(this.errors).length > 0) return;

        this.isSubmitting = true;
        const payload = { ...this.form };

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const reservas = JSON.parse(localStorage.getItem("reservas_tattoo") || "[]");
            reservas.unshift({ ...payload, createdAt: new Date().toISOString() });
            localStorage.setItem("reservas_tattoo", JSON.stringify(reservas));
            window.dispatchEvent(new Event("reservas:update"));

            const emailDelivered = await this.notifyInternalTeam(payload);

            if (emailDelivered) {
                toast.success("¡Reserva recibida!", {
                    description: `Te contactaremos pronto. Avisamos al estudio en ${this.internalEmail}.`
                });
            } else {
                toast.warning("Reserva guardada", {
                    description: "Registramos tu solicitud, pero no pudimos enviar el correo interno. Revisaremos la agenda manualmente."
                });
            }

            this.form = { ...this.initialFormState };
        } catch (error) {
            console.error("Error al registrar la reserva", error);
            toast.error("No pudimos registrar tu reserva", {
                description: "Inténtalo nuevamente en unos minutos o contáctanos por WhatsApp."
            });
        } finally {
            this.isSubmitting = false;
        }
    }
}
