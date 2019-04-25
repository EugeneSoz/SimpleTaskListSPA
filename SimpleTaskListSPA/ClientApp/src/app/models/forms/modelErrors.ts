import { NameHelper } from '../../helpers/nameHelper';
import { EntityType } from '../../enums/entityType';
import { TaskItem } from '../dataDTO/taskItem';
import { ErrorAttributes } from '../../enums/errorAttributes';
import { Category } from '../dataDTO/category';

export class ModelErrors {

    private _nh: NameHelper = new NameHelper();

    getValidationErrors(entityType: EntityType, property: string,
        errorName: string): string {
        switch (entityType) {
            case EntityType.TaskItem:
                return this.getTaskItemErrors(property, errorName);
            case EntityType.Category:
                return this.getCategoryErrors(property, errorName);
        }
    }

    private getTaskItemErrors(property: string, errorName: string): string {
        let msg: string = null;

        if (property == this._nh.nameof<TaskItem>("name")
            && errorName == ErrorAttributes.required) {
            msg = "Укажите название";
        }
        else if (property == this._nh.nameof<TaskItem>("name")
            && errorName == ErrorAttributes.range) {
            msg = "Название должно быть от 3 до 60 символов";
        }
        else if (property == this._nh.nameof<TaskItem>("planningDate")
            && errorName == ErrorAttributes.required) {
            msg = "Укажите дату в формате чч.мм.гггг";
        }
        else if (property == this._nh.nameof<TaskItem>("categoryId")
            && errorName == ErrorAttributes.minValue) {
            msg = "Укажите категорию задачи";
        }

        return msg;
    }

    private getCategoryErrors(property: string, errorName: string): string {
        let msg: string = null;

        if (property == this._nh.nameof<Category>("name")
            && errorName == ErrorAttributes.required) {
            msg = "Укажите название";
        }
        else if (property == this._nh.nameof<Category>("name")
            && errorName == ErrorAttributes.minlength) {
            msg = "Название должно быть от 3 до 60 символов";
        }

        return msg;
    }
}
