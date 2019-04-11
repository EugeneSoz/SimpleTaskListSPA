import { TaskItem } from './taskItem';

export class TaskItemResponse {
    constructor(
        public tasks: TaskDict = null) { }
}

interface TaskDict {
    [key: string]: Array<TaskItem>;
}
