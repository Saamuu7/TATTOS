import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Phone, MessageSquare, Mail, MapPin, Sparkles, Clock, Headphones, Instagram, Facebook, Send } from 'lucide-angular';
import { UiButtonDirective } from '../../../shared/ui/ui-button.directive';
import { SafePipe } from '../../../pipes/safe.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, UiButtonDirective, SafePipe],
  template: `
    <section id="contacto" class="relative py-24 overflow-hidden bg-background">
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div class="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-6">
            <lucide-icon [name]="SparklesIcon" class="w-4 h-4 text-primary"></lucide-icon>
            <span class="text-primary">Estamos aquí para ti</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            <span class="text-gradient">Contáctanos</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-3xl mx-auto">
            ¿Tienes dudas sobre tu próximo tatuaje o quieres agendar una cita? Estamos disponibles para ayudarte en todo momento.
          </p>
        </div>

        <div class="grid lg:grid-cols-5 gap-12">
          <div class="lg:col-span-3 flex flex-col gap-6">
            @for (item of contactItems; track item.title) {
              <a
                [href]="item.href"
                [target]="item.href.startsWith('http') ? '_blank' : null"
                [rel]="item.href.startsWith('http') ? 'noreferrer' : null"
                class="block transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div class="group p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300 flex items-center gap-6">
                  <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <lucide-icon [name]="item.icon" class="w-8 h-8 text-primary"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <p class="text-base text-muted-foreground mb-1">{{ item.title }}</p>
                    <p class="font-semibold text-foreground text-xl">{{ item.value }}</p>
                  </div>
                </div>
              </a>
            }
          </div>

          <div class="lg:col-span-2 space-y-8">
            <div class="p-6 rounded-2xl glass">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <lucide-icon [name]="ClockIcon" class="w-6 h-6 text-primary"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-bold text-foreground text-xl">Horario</h3>
                  <p class="text-muted-foreground text-sm">de atención</p>
                </div>
              </div>

              <div class="space-y-4">
                @for (item of schedule; track item.day) {
                  <div class="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                    <span class="text-muted-foreground">{{ item.day }}</span>
                    <span class="font-semibold" [class.text-destructive]="item.hours === 'Cerrado'" [class.text-foreground]="item.hours !== 'Cerrado'">
                      {{ item.hours }}
                    </span>
                  </div>
                }
              </div>

              <div class="mt-6 pt-4 border-t border-white/5">
                <div class="flex items-center gap-2 text-muted-foreground text-sm">
                  <lucide-icon [name]="HeadphonesIcon" class="w-4 h-4 text-primary"></lucide-icon>
                  <span>Atención personalizada garantizada</span>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl glass">
              <h3 class="font-bold text-foreground text-xl mb-4">Síguenos</h3>
              <div class="space-y-3">
                @for (link of socialLinks; track link.name) {
                  <a
                    [href]="link.href"
                    target="_blank"
                    rel="noreferrer"
                    class="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                  >
                    <div class="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <lucide-icon [name]="link.icon" class="w-5 h-5 text-primary"></lucide-icon>
                    </div>
                    <span class="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{{ link.name }}</span>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <p class="text-muted-foreground mb-6 text-lg">¿Listo para tu próximo tatuaje?</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="tel:+34123456789" uiButton size="lg" class="pulse-glow shadow-lg uppercase tracking-widest flex items-center gap-2">
              <lucide-icon [name]="PhoneIcon" class="w-5 h-5"></lucide-icon>
              Llamar ahora
            </a>
            <a
              href="https://wa.me/34123456789"
              target="_blank"
              rel="noreferrer"
              uiButton
              size="lg"
              variant="outline"
              class="border-primary/50 text-foreground hover:bg-primary/5 hover:text-primary uppercase tracking-widest flex items-center gap-2"
            >
              <lucide-icon [name]="MessageSquareIcon" class="w-5 h-5"></lucide-icon>
              WhatsApp
            </a>
          </div>
        </div>

        <div id="mapa" class="mt-20 relative">
          <div class="absolute -inset-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-30"></div>
          <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-background h-96 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe
              title="Ubicación del estudio"
              [src]="mapUrl | safe: true"
              width="100%"
              height="100%"
              style="border: 0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div class="absolute bottom-4 right-4 glass p-4 rounded-lg bg-black/80 text-right">
            <p class="text-foreground font-semibold">Calle Principal 123</p>
            <p class="text-muted-foreground">28001 Madrid, España</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  readonly SparklesIcon = Sparkles;
  readonly PhoneIcon = Phone;
  readonly MessageSquareIcon = MessageSquare;
  readonly MailIcon = Mail;
  readonly MapPinIcon = MapPin;
  readonly ClockIcon = Clock;
  readonly HeadphonesIcon = Headphones;

  contactItems = [
    {
      icon: Phone,
      title: "Teléfono",
      value: "+34 123 456 789",
      href: "tel:+34123456789",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "Enviar mensaje",
      href: "https://wa.me/34123456789",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@estudiotattoo.com",
      href: "mailto:info@estudiotattoo.com",
    },
    {
      icon: MapPin,
      title: "Dirección",
      value: "Calle Principal 123, Madrid",
      href: "#mapa",
    },
  ];

  schedule = [
    { day: "Lunes - Viernes", hours: "10:00 - 20:00" },
    { day: "Sábados", hours: "11:00 - 18:00" },
    { day: "Domingos", hours: "Cerrado" },
  ];

  socialLinks = [
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "TikTok", href: "https://tiktok.com", icon: Send },
  ];

  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.640263914959!2d-3.703790184592237!3d40.41677537936497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422880a1ABCAD1%3A0x2ad01f786c4ade53!2sPuerta%20del%20Sol%2C%20Madrid!5e0!3m2!1ses!2ses!4v1671234567890!5m2!1ses!2ses";
}
