import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Urls } from '../helpers/urls';
import { RestDatasource } from '../helpers/restDataSource';
import { QueryOptions } from '../models/dataDTO/queryOptions';
import { TaskItemResponse } from '../models/dataDTO/taskItemResponse';
import { TaskItem } from '../models/dataDTO/taskItem';
import { DropdownList } from '../viewmodels/dropdownlist';
import { TaskDates } from '../models/dataDTO/taskDates';

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
            if (this._selectedTask.planningDate != null) {
                this._selectedTask.planningDate = new Date(value.planningDate.toString());
            }

            this.isFormInEditMode = true;
        }
    }

    private _taskCopy: TaskItem = null;

    get taskCopy(): TaskItem {
        return this._taskCopy;
    }

    set taskCopy(value: TaskItem) {
        if (value == null) {
            this._taskCopy = value;
        }
        else {
            this._taskCopy = new TaskItem();
            Object.assign(this._taskCopy, value);
        }
        if (value != null) {
            this._taskCopy.id = 0;
        }
    }

    //ошибки полученные с сервера
    errors: Array<string> = null;
    queryOptions: QueryOptions = null;
    task: TaskItem = null;
    taskItems: TaskItemResponse = null;
    activeTasks: Array<TaskItem> = null;
    completedTasks: Array<TaskItem> = null;
    isFormShown: boolean = false;
    dropdownlist: DropdownList = null;
    isFormInEditMode: boolean = false;

    getTask(id: number): void {
        this._rest.getOne<TaskItem>(`${this._url.task}/${id}`)
            .subscribe(result => this.task = result);
    }

    recieveTasks(): void {
        this._rest.receiveAll<TaskItemResponse, QueryOptions>(this._url.tasks, this.queryOptions)
            .subscribe(result => {
                this.taskItems = result;

                if (this.taskItems != null && this.taskItems.tasks != null) {
                    this.activeTasks = this.taskItems.tasks["active"];
                    this.completedTasks = this.taskItems.tasks["completed"];
                }
                else {
                    this.taskItems = null;
                    this.activeTasks = null;
                    this.completedTasks = null;
                }
            });
    }

    createTask(quickTask: TaskItem = null): void {
        let task = quickTask != null ? quickTask : this._selectedTask;
        this._rest.create<TaskItem>(this._url.task_create, task)
            .subscribe((result: boolean) => {
                if (result) {
                    this.tasksChanged.next(true);
                    this.taskCopy = null;
                    this.recieveTasks();
                }

            },
                (errors) => this.errors = <string[]>errors);
    }

    updateTask(taskToUpdate: TaskItem = null): void {
        let task = taskToUpdate != null ? taskToUpdate : this.selectedTask;
        this._rest.update<TaskItem>(this._url.task_update, task)
            .subscribe((result: boolean) => {
                if (result) {
                    this.tasksChanged.next(true);
                    this.recieveTasks();
                }
            },
            (errors) => this.errors = <string[]>errors);
    }

    deleteTask(): void {
        this._rest.delete<TaskItem>(this._url.task_delete, this.task)
            .subscribe((result: boolean) => {
                if (result) {
                    this.tasksChanged.next(true);
                    this.recieveTasks();
                    this.task = null;
                }
            });
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

    setTaskPlanningDate(taskDates: TaskDates): void {
        this._rest.update<TaskDates>(this._url.task_setdate, taskDates)
            .subscribe((result: boolean) => {
                if (result) {
                    this.tasksChanged.next(true);
                    this.recieveTasks();
                }
            },
            (errors) => this.errors = <string[]>errors);
    }

    copySelectedTask(): void {
        this.createTask(this._taskCopy);
    }
}
