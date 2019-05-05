import { Component, Input } from '@angular/core';

import { TaskService } from '../../services/taskItem.service';
import { TaskItem } from '../../models/dataDTO/taskItem';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TaskDates } from '../../models/dataDTO/taskDates';
import { EntityType } from '../../enums/entityType';
import { DeleteMessageComponent } from '../modals/delete-message.component';

@Component({
    selector: 'app-task-actions',
    templateUrl: './task-actions.component.html',
})
export class TaskActionsComponent {

    constructor(
        private _taskService: TaskService,
        private _modalService: BsModalService) {
    }

    @Input() taskItem: TaskItem = null;

    onSetPlanningDate(daysToAdd: number): void {
        let task: TaskItem = new TaskItem();
        Object.assign(task, this.taskItem);
        let taskDates: TaskDates = new TaskDates(daysToAdd, task);

        this._taskService.setTaskPlanningDate(taskDates);
    }

    onCopyTask(): void {
        if (this._taskService.taskCopy == null) {
            this._taskService.taskCopy = new TaskItem();
        }
        this._taskService.taskCopy = this.taskItem;
    }

    onDelete(): void {
        const initialState = {
            entityType: EntityType.TaskItem,
            entityId: this.taskItem.id
        }
        this._modalService.show(DeleteMessageComponent, { initialState });
    }
}
