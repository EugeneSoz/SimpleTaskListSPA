import { Component } from '@angular/core';

import { BaseListBoxComponent } from '../../../viewmodels/baseListbox';
import { TaskDict } from '../../../models/dataDTO/taskItemResponse';
import { TaskService } from '../../../services/taskItem.service';

@Component({
    selector: 'app-starred-listbox',
    templateUrl: './starred-listbox.component.html',
})
export class StarredListboxComponent extends BaseListBoxComponent {

    constructor(
        taskService: TaskService) {
        super(taskService);
    }

    get tasks(): TaskDict {
        return this._taskService.taskItems.tasks;
    }

    get keys(): Array<string> {
        return Object.keys(this._taskService.taskItems.tasks);
    }
}
