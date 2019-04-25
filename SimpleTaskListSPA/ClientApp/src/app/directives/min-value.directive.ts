import { Directive, Input } from "@angular/core";
import { Validator, AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appMinValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinValueValidatorDirective, multi: true }]
})
export class MinValueValidatorDirective implements Validator {

    @Input("appMinValue") minValue: string;

    validate(control: AbstractControl): ValidationErrors | null {
        let intMinValue: number = 0;
        if (this.minValue != null) {
            intMinValue = Number.parseInt(this.minValue);
        }

        return !isNaN(intMinValue)
            ? this.minValueValidator(intMinValue)(control)
            : null;
    }

    private minValueValidator(value: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let controlValue: number = Number(control.value);

            return controlValue < value
                ? { 'minValue': { value: control.value } }
                : null;
        };
    }
}
