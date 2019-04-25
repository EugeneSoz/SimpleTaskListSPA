import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../../services/taskItem.service';
import { TaskItem } from '../../models/dataDTO/taskItem';

@Component({
    selector: 'app-taskbox',
    templateUrl: './taskbox.component.html',
})
export class TaskboxComponent {

    constructor(
        private _taskService: TaskService) {
    }

    @Input() taskItem: TaskItem = null;

    //доступны ли дополнительные дейтсвия над задачей
    get areActionsAvailable(): boolean {
        return this.taskItem.id == this._taskService.selectedTask.id;
    }

    get starColor(): string {
        let isImportant: boolean = this.taskItem == null ? false : this.taskItem.isImportant;
        return isImportant ? "text-warning" : "text-info";
    }

    //для установки стилей задач
    get taskCssClass(): string {
        let cssClass: string = "active-task";

        if (this._taskService.selectedTask.id == this.taskItem.id) {
            cssClass = "selected-task";
        }
        else if (!this.taskItem.isCompleted && this.taskItem.isOverdue) {
            cssClass = "overdue-task";
        }
        else if (this.taskItem.isCompleted) {
            cssClass = "completed-task";
        }

        return `rounded row py-2 pl-3 mt-1 ${cssClass}`;
    }

    //выбрать задачу щелчком мыши
    onSelectOrDeselectTask(): void {
        this._taskService.selectedTask = this.taskItem;
    }

    //пометить как завершённую
    onChangeCompletionTask(value: boolean) {
        this.taskItem.isCompleted = value;
        this._taskService.updateTask();
    }

    //пометить как важную
    onSwitchTaskImportance(value: boolean) {
        this.taskItem.isImportant = !this.taskItem.isImportant;
        this._taskService.updateTask();
    }
}
