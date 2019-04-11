import { Category } from './category';

export class TaskItem {
    constructor(
        public id: number = 0,
        public name: string = "",
        public creationDate: Date = null,
        public planningDate: Date = null,
        public effectiveDate: Date = null,
        public isPlanningDateUsed: boolean = false,
        public isCompleted: boolean = false,
        public isOverdue: boolean = false,
        public isImportant: boolean = false,
        public category: Category = null,
        public categoryId: number = 0) { }
}
