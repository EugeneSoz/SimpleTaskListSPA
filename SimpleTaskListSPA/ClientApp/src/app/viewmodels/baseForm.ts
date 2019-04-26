import { ModelErrors } from '../models/forms/modelErrors';
import { NgModel } from '@angular/forms';
import { ErrorAttributes } from '../enums/errorAttributes';
import { EntityType } from '../enums/entityType';

export class BaseFormComponent {
    constructor(
        modelErrors: ModelErrors,
        entityType: EntityType) {

        this._modelErrors = modelErrors;
        this._entityType = entityType;
    }

    private _modelErrors: ModelErrors;
    private _entityType: EntityType;

    getErrors(control: NgModel, property: string): Array<string> {
        if (control.dirty && control.invalid) {
            return this.getValidationMessages(control, property);
        }
        else {
            return null;
        }
    }

    private getValidationMessages(control: NgModel, property: string): Array<string> {
        let messages: Array<string> = new Array<string>();

        if (control.errors) {
            for (let errorName in control.errors) {
                switch (errorName) {
                    case ErrorAttributes.required:
                        messages.push(this._modelErrors.getValidationErrors(this._entityType,
                            property, errorName));
                        break;
                    case ErrorAttributes.range:
                        messages.push(this._modelErrors.getValidationErrors(this._entityType,
                            property, errorName));
                        break;
                    case ErrorAttributes.minValue:
                        messages.push(this._modelErrors.getValidationErrors(this._entityType,
                            property, errorName));
                        break;
                }
            }
        }

        return messages;
    }
}
