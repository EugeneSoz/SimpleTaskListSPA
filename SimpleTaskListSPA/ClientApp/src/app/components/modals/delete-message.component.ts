import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/taskItem.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntityType } from '../../enums/entityType';
import { Category } from '../../models/dataDTO/category';
import { TaskItem } from '../../models/dataDTO/taskItem';

@Component({
    selector: 'app-delete-message',
    templateUrl: './delete-message.component.html',
})
export class DeleteMessageComponent implements OnInit {

    constructor(
        private _categoryService: CategoryService,
        private _taskService: TaskService,
        public bsModalRef: BsModalRef) { }

    entityType: EntityType;
    entityId: number;

    get category(): Category {
        return this._categoryService.category;
    }

    get task(): TaskItem {
        return this._taskService.task;
    }

    confirmationBtnTitle = "Да";
    cancelationBtnTitle = "Нет";

    get formHeader(): string {
        switch (this.entityType) {
            case EntityType.Category:
                return "Удаление категории";
            case EntityType.TaskItem:
                return "Удаление задачи";
            default:
                return "";
        }
    }

    get question(): string
    {
        switch (this.entityType) {
            case EntityType.Category:
                return "Вы действительно хотите удалить категорию?";
            case EntityType.TaskItem:
                return "Вы действительно хотите удалить задачу?";
            default:
                return "";
        }
    }

    get objectName(): string
    {
        switch (this.entityType) {
            case EntityType.Category:
                return this.category.name;
            case EntityType.TaskItem:
                return this.task.name;
            default:
                return "";
        }
    }

    get objectDetails(): Array<string> {
        let details: Array<string> = new Array<string>();
        if (this.isObjectDetailsShown) {
            for (let taskItem of this.category.taskItems)
            {
                details.push(taskItem.name);
            }

        }
        return details;
    }

    get isObjectDetailsShown(): boolean {
        let ok: boolean = this.entityType == EntityType.Category &&
            this.category.taskItems != null &&
            this.category.taskItems.length > 0;

        return ok;
    }

    ngOnInit(): void {
        if (this.entityType == EntityType.Category) {
            this._categoryService.getCategory(this.entityId);
        }
        else {
            this._taskService.getTask(this.entityId);
        }
    }

    onDelete(): void {
        if (this.entityType == EntityType.Category) {
            this._categoryService.deleteCategory();
            this._categoryService.filterByHomeCategory();
        }
        else {
            this._taskService.deleteTask();
        }
        this.onCancel();
    }

    onCancel(): void {
        this.bsModalRef.hide();
    }
}
