import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe',
    standalone: true
})
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: string, active: boolean = false) {
        if (active) {
            // This is a hack because iframe src doesn't like SanitzedResourceUrl sometimes depending on usage
            // But simpler usage:
            return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        return url;
    }
}
