import { TaskItem } from './taskItem';

export class Category {
    constructor(
        public id: number = 0,
        public name: string = "",
        public taskItems: Array<TaskItem> = null) { }
}
