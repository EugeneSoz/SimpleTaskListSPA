import { TaskItem } from './taskItem';

export class TaskDates {
    constructor(
        public DaysAdditionToPlannigDate: number = 0,
        public TaskItem: TaskItem = null) { }
}
