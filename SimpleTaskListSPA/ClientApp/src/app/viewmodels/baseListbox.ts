import { OnInit, Inject } from '@angular/core';

import { TaskService } from '../services/taskItem.service';

export class BaseListBoxComponent implements OnInit {
    constructor(
        protected _taskService: TaskService) { }

    ngOnInit(): void {
        this._taskService.recieveTasks();
    }
}
