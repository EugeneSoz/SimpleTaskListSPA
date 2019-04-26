import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaskService } from '../../services/taskItem.service';
import { CategoryService } from '../../services/category.service';
import { TaskItem } from '../../models/dataDTO/taskItem';
import { Category } from '../../models/dataDTO/category';
import { EntityType } from '../../enums/entityType';
import { ModelErrors } from '../../models/forms/modelErrors';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BaseFormComponent } from '../../viewmodels/baseForm';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
})
export class TaskFormComponent extends BaseFormComponent implements OnInit {

    constructor(
        private _taskService: TaskService,
        private _categoryService: CategoryService,
        private _localeService: BsLocaleService) {

        super(new ModelErrors(), EntityType.TaskItem);
    }

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
}
