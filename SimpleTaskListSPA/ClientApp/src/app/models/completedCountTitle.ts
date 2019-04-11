export class CompletedCountTitle {
    getTitle(taskCount: number): string {
        let valueToCheck: number = taskCount < 20
            ? taskCount
            : taskCount % taskCount.toString().length;

        switch (valueToCheck) {
            case 1:
                return `${taskCount} задача`;
            case 2:
            case 3:
            case 4:
                return `${taskCount} задачи`;
            default:
                return `${taskCount} задач`;
        }
    }
}
