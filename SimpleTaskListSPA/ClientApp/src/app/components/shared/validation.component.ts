import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
})
export class ValidationComponent {
    @Input() messages: Array<string> = null;
}
