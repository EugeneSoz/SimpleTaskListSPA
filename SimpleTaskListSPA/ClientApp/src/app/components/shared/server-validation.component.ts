import { Component, Input } from "@angular/core";

@Component({
    selector: 'server-validation',
    templateUrl: './server-validation.component.html',
})
export class ServerValidationComponent {
    @Input() errors: Array<string> = null;
}
