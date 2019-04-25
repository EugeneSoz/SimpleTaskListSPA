import { Component } from '@angular/core';

import { BaseListBoxComponent } from '../../../viewmodels/baseListbox';
import { TaskDict } from '../../../models/dataDTO/taskItemResponse';
import { TaskService } from '../../../services/taskItem.service';

@Component({
    templateUrl: './found-listbox.component.html',
})
export class FoundListboxComponent extends BaseListBoxComponent {

    constructor(
        taskService: TaskService) {
        super(taskService);
    }

    get tasks(): TaskDict {
        return this._taskService.taskItems.tasks;
    }

    get message(): string {
        return this._taskService.taskItems.tasks != null
            && Object.keys(this._taskService.taskItems.tasks).length > 0  ? null : "Ничего не найдено";
    }

    get keys(): Array<string> {
        return Object.keys(this._taskService.taskItems.tasks);
    }
}
