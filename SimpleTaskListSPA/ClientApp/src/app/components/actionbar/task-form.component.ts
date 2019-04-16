import { Component } from '@angular/core';
import { TaskService } from '../../services/taskItem.service';
import { CategoryService } from '../../services/category.service';
import { TaskItem } from '../../models/dataDTO/taskItem';
import { Category } from '../../models/dataDTO/category';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
})
export class TaskFormComponent {

    constructor(
        private _taskService: TaskService,
        private _categoryService: CategoryService) { }

    newTask: TaskItem = new TaskItem();

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

    //отображается ли форма
    get isFormShown(): boolean {
        return this._taskService.isFormShown;
    }

    onHideForm(): void {
        this._taskService.isFormShown = false;
    }
}
