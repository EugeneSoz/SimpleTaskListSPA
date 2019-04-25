import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { Urls } from '../helpers/urls';
import { RestDatasource } from '../helpers/restDataSource';
import { QueryOptions } from '../models/dataDTO/queryOptions';
import { TaskItemResponse } from '../models/dataDTO/taskItemResponse';
import { HttpMethod } from '../helpers/httpMethod';
import { TaskItem } from '../models/dataDTO/taskItem';
import { DropdownList } from '../viewmodels/dropdownlist';

@Injectable()
export class TaskService {
    constructor(
        private _url: Urls,
        private _rest: RestDatasource) {

        this.queryOptions = new QueryOptions();
        this.queryOptions.resetToDefault();
        this.dropdownlist = new DropdownList();
        this.dropdownlist.createSortingList("#");
    }

    private _selectedTask: TaskItem = new TaskItem();

    tasksChanged: Subject<boolean> = new Subject<boolean>();

    get selectedTask(): TaskItem {
        return this._selectedTask;
    }

    set selectedTask(value: TaskItem) {
        if (value != null && this._selectedTask.id == value.id || value.id == 0) {
            this._selectedTask = new TaskItem();
            this.isFormInEditMode = false;
        }
        else {
            this._selectedTask = new TaskItem();
            Object.assign(this._selectedTask, value);
            this._selectedTask.planningDate = new Date(value.planningDate.toString());
            this.isFormInEditMode = true;
        }        
    }

    //ошибки полученные с сервера
    errors: Array<string> = null;
    queryOptions: QueryOptions = null;
    taskItems: TaskItemResponse = null;
    activeTasks: Array<TaskItem> = null;
    completedTasks: Array<TaskItem> = null;
    isFormShown: boolean = false;
    dropdownlist: DropdownList = null;
    isFormInEditMode: boolean = false;

    recieveTasks(): void {
        this._rest.sendRequest<TaskItemResponse, QueryOptions>(HttpMethod.post,
            this._url.tasks, this.queryOptions)
            .subscribe(response => {
                this.taskItems = this._rest.getResult(response, HttpMethod.post);

                if (this.taskItems != null && this.taskItems.tasks != null) {
                    this.activeTasks = this.taskItems.tasks["active"];
                    this.completedTasks = this.taskItems.tasks["completed"];
                }
            });
    }

    createTask(): void {
        this._rest.sendRequest<{}, TaskItem>(HttpMethod.post, this._url.task_create, this._selectedTask)
            .subscribe(
                () => {
                    this.tasksChanged.next(true);
                    this.recieveTasks();
                },
                (error) => this.errors = error);
    }

    updateTask(): void {
        this._rest.sendRequest<{}, TaskItem>(HttpMethod.put, this._url.task_update, this._selectedTask)
            .subscribe(
                () => {
                    this.tasksChanged.next(true);
                    this.recieveTasks();
            },
            (error) => this.errors = error);
    }

    sortBy(sortPropertyName: string): void {
        if (sortPropertyName == "desc") {
            this.queryOptions.descendingOrder = !this.queryOptions.descendingOrder;
        }
        else {
            this.queryOptions.sortPropertyName = sortPropertyName;
        }
        this.recieveTasks();
    }
}
