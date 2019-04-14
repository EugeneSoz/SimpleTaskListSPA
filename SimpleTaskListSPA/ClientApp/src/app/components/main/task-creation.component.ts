import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TaskItem } from '../../models/dataDTO/taskItem';

@Component({
    selector: 'app-task-creation',
    templateUrl: './task-creation.component.html',
})
export class TaskCreationComponent implements OnInit {

    constructor(
        private _categoryService: CategoryService) { }

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

    ngOnInit(): void {
        this.createNewTask();
    }

    private createNewTask(): void {
        this.taskItem = new TaskItem();
        this.taskItem.categoryId = this.getCategoryId();
    }

    private getCategoryId(): number {
        return this._categoryService.selectedCategory.id < 0 ? 1 : this._categoryService.selectedCategory.id;
    }
}
