import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseListBoxComponent } from '../../../viewmodels/baseListbox';
import { TaskDict } from '../../../models/dataDTO/taskItemResponse';
import { TaskService } from '../../../services/taskItem.service';
import { Category_Changed, CategoryEventArgs } from '../../../models/events/categoryEventArgs';

@Component({
    templateUrl: './week-listbox.component.html',
})
export class WeekListboxComponent extends BaseListBoxComponent {
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
