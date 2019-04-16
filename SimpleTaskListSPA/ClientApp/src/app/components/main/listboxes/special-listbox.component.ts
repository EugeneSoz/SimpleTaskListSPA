import { Component } from '@angular/core';

import { BaseListBoxComponent } from '../../../viewmodels/baseListbox';
import { TaskDict } from '../../../models/dataDTO/taskItemResponse';
import { TaskService } from '../../../services/taskItem.service';
import { CategoryService } from '../../../services/category.service';

@Component({
    templateUrl: './special-listbox.component.html',
})
export class SpecialListboxComponent extends BaseListBoxComponent {

    constructor(
        taskService: TaskService,
        private _categoryService: CategoryService) {
        super(taskService);
    }

    get tasks(): TaskDict {
        return this._taskService.taskItems.tasks;
    }

    get keys(): Array<string> {
        return Object.keys(this._taskService.taskItems.tasks);
    }

    get isTaskCreationVisible(): boolean {
        return this._categoryService.currentPageUrl == "/week"
            ? false
            : true;
    }
}
