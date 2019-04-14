import { Component } from '@angular/core';
import { TaskService } from '../../services/taskItem.service';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
})
export class ActionsComponent {

    constructor(
        private _taskService: TaskService) { }

    get openFormTitle(): string {
        return this._taskService.selectedTask.id > 0
        ? "Детали задачи"
        : "Новая задача";
    }

    get isOpenFormTitleVisible(): boolean {
        return !this._taskService.isFormShown;
    }
}
