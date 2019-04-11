import { Category } from './category';

export class CategoryResponse extends Category {
    constructor(
        public overdueTasksCount: number = 0,
        public allTasksCount: number = 0) {

        super();
    }
}
