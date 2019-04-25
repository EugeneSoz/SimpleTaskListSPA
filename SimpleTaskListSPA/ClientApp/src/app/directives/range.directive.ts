import {  Directive, Input } from "@angular/core";
import { Validator, AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appRange]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RangeValidatorDirective, multi: true }]
})
export class RangeValidatorDirective implements Validator {

    @Input("appRange") rangeVals: string;

    validate(control: AbstractControl): ValidationErrors | null {
        let min: number = 0;
        let max: number = 0;
        if (this.rangeVals != null) {
            let index: number = this.rangeVals.indexOf(",");
            if (index != -1) {
                min = Number.parseInt(this.rangeVals.slice(0, index));
                max = Number.parseInt(this.rangeVals.slice(index + 1, this.rangeVals.length));
            }
        }
        
        return min != 0 && max != 0
            ? this.rangeValidator(min, max)(control)
            : null;
    }

    private rangeValidator(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let valueLength: number = control == null || control.value == null
                ? 0
                : (control.value as string).length;

            return valueLength < min || valueLength > max
                ? { 'range': { value: control.value } }
                : null;
        };
    }
}
