import { Component, OnInit } from '@angular/core';
import { DataOptionsService } from '../../services/dataOptions.service';
import { MigrationsOptions } from '../../models/dataDTO/migrationsOptions';

@Component({
    templateUrl: './data-options.component.html',
    providers: [DataOptionsService]
})
export class DataOptionsComponent implements OnInit {

    constructor(
        private _dataOptionsService: DataOptionsService) {
    }

    get model(): MigrationsOptions {
        return this._dataOptionsService.migrationsOptions;
    }

    get infoMessageVisible(): boolean {
        if (this._dataOptionsService.infoMessage == undefined
            || this._dataOptionsService.infoMessage == null
            || this._dataOptionsService.infoMessage.trim() == "") {
            return false;
        }
        return true;
    }

    get contextName(): string {
        return this._dataOptionsService.contextName;
    }

    get migrationName(): string {
        return this._dataOptionsService.migrationName;
    }

    ngOnInit() {
        this._dataOptionsService.getDbservices();
    }

    onChangeContext(context: string): void {
        this._dataOptionsService.contextName = context;
    }

    onChangeMigration(migration: string): void {
        this._dataOptionsService.migrationName = migration;
    }

    onSeedDatabase(): void {
        this._dataOptionsService.seedDatabase(false);
    }

    onSeedDatabaseFromFile(): void {
        this._dataOptionsService.seedDatabase(true);
    }
}
