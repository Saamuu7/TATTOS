import { Component, Directive, Input, Output, EventEmitter, inject, signal, computed, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { LucideAngularModule, X } from 'lucide-angular';

// Sheet Service/State
@Component({
    selector: 'app-sheet',
    standalone: true,
    template: `<ng-content></ng-content>`,
    imports: [CommonModule]
})
export class SheetComponent {
    // Simple state management
    isOpen = signal(false);

    toggle() {
        this.isOpen.update(v => !v);
    }

    close() {
        this.isOpen.set(false);
    }

    open() {
        this.isOpen.set(true);
    }
}

@Directive({
    selector: '[appSheetTrigger]',
    standalone: true,
    host: {
        '(click)': 'handleClick()'
    }
})
export class SheetTriggerDirective {
    private sheet = inject(SheetComponent);

    handleClick() {
        this.sheet.toggle();
    }
}

const sheetVariants = cva(
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
            },
        },
        defaultVariants: {
            side: "right",
        },
    }
);

@Component({
    selector: 'app-sheet-content',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    styles: [`:host { display: contents; }`],
    template: `
    @if (sheet.isOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        [attr.data-state]="sheet.isOpen() ? 'open' : 'closed'"
        (click)="sheet.close()"
      ></div>
      <div
        [class]="contentClass()"
        [attr.data-state]="sheet.isOpen() ? 'open' : 'closed'"
      >
        <ng-content></ng-content>
        <button
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          (click)="sheet.close()"
        >
          <lucide-icon [name]="XIcon" class="h-4 w-4"></lucide-icon>
          <span class="sr-only">Close</span>
        </button>
      </div>
    }
  `
})
export class SheetContentComponent {
    sheet = inject(SheetComponent);
    readonly XIcon = X;

    @Input() side: 'top' | 'bottom' | 'left' | 'right' = 'right';
    @Input() class = '';

    contentClass = computed(() => {
        return cn(sheetVariants({ side: this.side }), this.class);
    });
}
