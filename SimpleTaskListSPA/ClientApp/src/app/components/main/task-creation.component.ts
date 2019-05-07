import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../../services/category.service';
import { TaskItem } from '../../models/dataDTO/taskItem';
import { BaseFormComponent } from '../../viewmodels/baseForm';
import { EntityType } from '../../enums/entityType';
import { ModelErrors } from '../../models/forms/modelErrors';
import { TaskService } from '../../services/taskItem.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-task-creation',
    templateUrl: './task-creation.component.html',
})
export class TaskCreationComponent extends BaseFormComponent implements OnInit, OnDestroy {

    constructor(
        private _taskService: TaskService,
        private _categoryService: CategoryService,
        private _localeService: BsLocaleService) {

        super(new ModelErrors(), EntityType.TaskItem);
        _categoryService.selectedCategoryChanged
            .subscribe(response => {
                if (response) {
                    this.createNewTask();
                }
            });
    }

    taskItem: TaskItem = null;
    get calendarColour(): string {
        return this.taskItem.isPlanningDateUsed
            ? "#e0a800"
            : "#fff";
    }

    get starColour(): string {
        return this.taskItem.isImportant
            ? "#e0a800"
            : "#fff";
    }

    get errors(): Array<string> {
        return this._taskService.errors;
    }

    ngOnInit(): void {
        this._localeService.use("ru");
        this.createNewTask();
    }

    onSwitchTaskImportance(): void {
        this.taskItem.isImportant = !this.taskItem.isImportant;
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            this._taskService.createTask(this.taskItem);
            this.createNewTask();
            form.reset();
        }
    }

    private createNewTask(): void {
        this.taskItem = new TaskItem();
        this.taskItem.categoryId = this._categoryService.selectedCategory.id < 0
            ? this._categoryService.homeCategoryId
            : this._categoryService.selectedCategory.id;
    }

    ngOnDestroy(): void {
        //this._categoryService.selectedCategoryChanged.unsubscribe();
    }
}
