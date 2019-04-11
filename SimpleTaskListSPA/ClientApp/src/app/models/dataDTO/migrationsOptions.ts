export class MigrationsOptions {
    constructor(
        public tasksCount: number = 0,
        public categoriesCount: number = 0,
        public contextNames: Array<string> = new Array<string>(),
        public appliedMigrations: Array<string> = new Array<string>(),
        public pendingMigrations: Array<string> = new Array<string>(),
        public allMigrations: Array<string> = new Array<string>(),
        public infoMessage: string = "") {
    }
}
