import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskService } from '../../../services/taskItem.service';
import { CompletedCountTitle } from '../../../models/completedCountTitle';
import { TaskItem } from '../../../models/dataDTO/taskItem';
import { BaseListBoxComponent } from '../../../viewmodels/baseListbox';

@Component({
    templateUrl: './inbox-listbox.component.html',
})
export class InboxListboxComponent extends BaseListBoxComponent {

    constructor(
        taskService: TaskService) {
        super(taskService);
    }

    private readonly _completedCountTitle: CompletedCountTitle = new CompletedCountTitle();

    //отображаются ли завершённые задачи
    isCompletedShown: boolean = false;

    //все задачи, полученные с сервера
    get activeTasks(): Array<TaskItem> {
        return this._taskService.activeTasks || new Array<TaskItem>();
    }

    get completedTasks(): Array<TaskItem> {
        return this._taskService.completedTasks || new Array<TaskItem>();
    }

    get showCompletedTitle(): string {
        let tasksCount: string = this._completedCountTitle.getTitle(this.completedTasks.length);

        return this.isCompletedShown ? `Скрыть завершенные (${tasksCount})`
            : `Показать завершенные (${tasksCount})`;
    }
    
    //отобразить или скрыть завершённые задачи
    onShowOrHideCompletedTasks(): void {
        this.isCompletedShown = !this.isCompletedShown;
    }
}
