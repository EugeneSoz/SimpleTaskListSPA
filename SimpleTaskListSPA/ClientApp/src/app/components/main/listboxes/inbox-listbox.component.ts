import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/taskItem.service';
import { CompletedCountTitle } from '../../../models/completedCountTitle';
import { TaskItem } from '../../../models/dataDTO/taskItem';

@Component({
    templateUrl: './inbox-listbox.component.html',
})
export class InboxListboxComponent implements OnInit {

    constructor(
        private _taskService: TaskService) { }

    ngOnInit(): void {
        this._taskService.recieveTasks();
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
