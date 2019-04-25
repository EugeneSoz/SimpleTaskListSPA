import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/taskItem.service';
import { CategoryService } from '../../services/category.service';
import { TaskItem } from '../../models/dataDTO/taskItem';
import { Category } from '../../models/dataDTO/category';
import { NgModel, NgForm } from '@angular/forms';
import { EntityType } from '../../enums/entityType';
import { ErrorAttributes } from '../../enums/errorAttributes';
import { ModelErrors } from '../../models/forms/modelErrors';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {

    constructor(
        private _taskService: TaskService,
        private _categoryService: CategoryService,
        private _localeService: BsLocaleService) {

        this._modelErrors = new ModelErrors();
    }

    private _entityType: EntityType = EntityType.TaskItem;
    private _modelErrors: ModelErrors;

    get newTask(): TaskItem {
        return this._taskService.selectedTask;
    }

    //категории задач для выбора
    get categories(): Array<Category> {
        return this._categoryService.categories;
    }

    //создаётся новая задача, или редактируется старая
    get isEditMode(): boolean {
        return this._taskService.isFormInEditMode;
    }

    get submitBtnCssClass(): string {
        return this.isEditMode
            ? "btn btn-warning w-100"
            : "btn btn-success w-100";
    }

    get submitBtnTitle(): string {
        return this.isEditMode
            ? "Изменить"
            : "Создать";
    }

    get jsonTaskItem(): string {
        return JSON.stringify(this.newTask);
    }

    //отображается ли форма
    get isFormShown(): boolean {
        return this._taskService.isFormShown;
    }

    get errors(): Array<string> {
        return this._taskService.errors;
    }

    ngOnInit(): void {
        this._localeService.use("ru");
    }

    onHideForm(): void {
        this._taskService.isFormShown = false;
    }

    onSwitchTaskCompletion(): void {
        this.newTask.isCompleted = !this.newTask.isCompleted;
    }

    onSwitchTaskImportance(): void {
        this.newTask.isImportant = !this.newTask.isImportant;
    }

    getErrors(control: NgModel, property: string): Array<string> {
        if (control.dirty && control.invalid) {
            return this.getValidationMessages(control, property);
        }
        else {
            return null;
        }
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.isEditMode) {
                this._taskService.updateTask();
            }
            else {
                this._taskService.createTask();
            }
            this._taskService.selectedTask = new TaskItem();
            form.reset();
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
