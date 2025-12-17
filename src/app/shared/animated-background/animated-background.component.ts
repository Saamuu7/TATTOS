import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, NgZone } from '@angular/core';

class InkStroke {
    private offset = Math.random() * 500;
    private readonly speed = Math.random() * 0.6 + 0.2;
    private readonly amplitude = Math.random() * 120 + 80;
    private readonly thickness = Math.random() * 0.8 + 0.4;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private canvas: HTMLCanvasElement,
        private baseY: number,
        private hue: number
    ) { }

    update() {
        this.offset += this.speed;
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-200, this.baseY);

        for (let x = -200; x <= this.canvas.width + 200; x += 40) {
            const angle = (x + this.offset) / 140;
            const y = this.baseY + Math.sin(angle) * this.amplitude;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${this.hue}, 70%, 55%, 0.08)`;
        ctx.lineWidth = this.thickness;
        ctx.shadowBlur = 40;
        ctx.shadowColor = `hsla(${this.hue}, 80%, 50%, 0.25)`;
        ctx.stroke();
        ctx.restore();
    }
}

class InkSpark {
    private x: number;
    private y: number;
    private readonly radius = Math.random() * 2 + 0.5;
    private readonly hue = Math.random() > 0.5 ? 355 : 37;
    private velocityX = (Math.random() - 0.5) * 0.3;
    private velocityY = (Math.random() - 0.5) * 0.3;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private canvas: HTMLCanvasElement
    ) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0 || this.x > this.canvas.width) this.velocityX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.velocityY *= -1;
    }

    draw() {
        const ctx = this.ctx;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 10);
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.35)`);
        gradient.addColorStop(1, "transparent");

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

@Component({
    selector: 'app-animated-background',
    standalone: true,
    template: `<canvas #canvas class="fixed inset-0 pointer-events-none z-0 opacity-40"></canvas>`
})
export class AnimatedBackgroundComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private animationId: number | null = null;
    private resizeListener: (() => void) | null = null;

    constructor(private ngZone: NgZone) { }

    ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let strokes: InkStroke[] = [];
        let sparks: InkSpark[] = [];

        const buildScene = () => {
            strokes = [];
            sparks = [];

            const strokeCount = Math.max(3, Math.floor(canvas.height / 260));
            for (let i = 0; i < strokeCount; i++) {
                const baseY = (canvas.height / (strokeCount + 1)) * (i + 1);
                const hue = i % 2 === 0 ? 355 : 37;
                strokes.push(new InkStroke(ctx, canvas, baseY, hue));
            }

            const sparkCount = Math.floor((canvas.width * canvas.height) / 18000);
            for (let i = 0; i < sparkCount; i++) {
                sparks.push(new InkSpark(ctx, canvas));
            }
        };

        const drawBackdrop = () => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "hsla(220, 25%, 6%, 0.65)");
            gradient.addColorStop(1, "hsla(355, 64%, 10%, 0.45)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackdrop();

            strokes.forEach((stroke) => {
                stroke.update();
                stroke.draw();
            });

            sparks.forEach((spark) => {
                spark.update();
                spark.draw();
            });

            this.animationId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            buildScene();
        };

        this.resizeListener = handleResize;
        window.addEventListener('resize', handleResize);

        // Run animation outside Angular zone to avoid change detection on every frame
        this.ngZone.runOutsideAngular(() => {
            handleResize();
            animate();
        });
    }

    ngOnDestroy() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }
    }
}
