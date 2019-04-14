import { TaskItem } from './taskItem';

export class TaskItemResponse {
    constructor(
        public tasks: TaskDict = null) { }
}

export interface TaskDict {
    [key: string]: Array<TaskItem>;
}
