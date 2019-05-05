import { Component } from '@angular/core';
import { TaskService } from '../../services/taskItem.service';
import { ListItem } from '../../viewmodels/dropdownlist';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: '.navbar-nav .mr-auto',
    templateUrl: './actions.component.html',
})
export class ActionsComponent {

    constructor(
        private _taskService: TaskService,
        private _categoryService: CategoryService) { }

    get isThereTaskCopy(): boolean {
        return this._taskService.taskCopy != null ? true : false;
    }

    get openFormTitle(): string {
        return this._taskService.selectedTask.id > 0
        ? "Детали задачи"
        : "Новая задача";
    }

    get isOpenFormTitleVisible(): boolean {
        return !this._taskService.isFormShown;
    }

    get listItems(): Array<ListItem> {
        return this._taskService.dropdownlist.listItems;
    }

    //выделить в выпадающем списке свойство сортировки
    setElementCssClass(listItem: ListItem): string {
        let cssClass: string = null;

        if (listItem.propertyName == "desc") {
            cssClass = this._taskService.queryOptions.descendingOrder ? "" : " active";
        }
        else {
            cssClass = this._taskService.queryOptions.sortPropertyName == listItem.propertyName
                ? " active"
                : "";
        }

        return `dropdown-item${cssClass}`;
    }

    onSortBy(listItem: ListItem): void {
        this._taskService.sortBy(listItem.propertyName);
    }

    onShowTaskForm(): void {
        this._taskService.isFormShown = true;
    }

    onPasteTaskCopy(): void {
        this._taskService.taskCopy.categoryId = this._categoryService.selectedCategory.id < 0
            ? this._categoryService.homeCategoryId
            : this._categoryService.selectedCategory.id;

        this._taskService.copySelectedTask();
    }
}
