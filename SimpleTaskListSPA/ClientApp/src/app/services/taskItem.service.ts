import { Injectable } from '@angular/core';
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

    get selectedTask(): TaskItem {
        return this._selectedTask;
    }

    set selectedTask(value: TaskItem) {
        if (this._selectedTask != null && this._selectedTask.id == value.id) {
            this._selectedTask = new TaskItem();
        }
        else {
            this._selectedTask = value;
        }        
    }

    queryOptions: QueryOptions = null;
    taskItems: TaskItemResponse = null;
    activeTasks: Array<TaskItem> = null;
    completedTasks: Array<TaskItem> = null;
    isFormShown: boolean = true;
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

    updateTask(taskItem: TaskItem): void {
        
    }

    sortBy(sortPropertyName: string): void {
        if (sortPropertyName == "desc") {
            this.queryOptions.descendingOrder = !this.queryOptions.descendingOrder;
        }
        else {
            this.queryOptions.sortPropertyName = sortPropertyName;
        }
    }
}
