import { Injectable } from '@angular/core';
import { Urls } from '../helpers/urls';
import { RestDatasource } from '../helpers/restDataSource';
import { MigrationsOptions } from '../models/dataDTO/migrationsOptions';
import { HttpMethod } from '../helpers/httpMethod';

@Injectable()
export class DataOptionsService {
    constructor(
        private _urls: Urls,
        private _rest: RestDatasource) { }

    migrationsOptions: MigrationsOptions = new MigrationsOptions();
    contextName: string = "";
    migrationName: string = "";
    infoMessage: string = "";

    getDbservices(): void {
        this._rest.sendRequest<MigrationsOptions, {}>(HttpMethod.get, this._urls.dataOptions)
            .subscribe(response => {
                this.migrationsOptions = this._rest.getResult(response, HttpMethod.get);

            this.contextName = this.migrationsOptions.contextNames[0];

            let index: number = this.migrationsOptions.allMigrations.length - 1;
            this.migrationName = this.migrationsOptions.allMigrations[index];
            this.infoMessage = this.migrationsOptions.infoMessage;
        });
    }

    seedDatabase(fromFile: boolean): void {
        let url: string = `${this._urls.seed}/${this.contextName}/${fromFile}`;
        this._rest.sendRequest<string, {}>(HttpMethod.get, url)
            .subscribe(response => {
                this.infoMessage = this._rest.getResult(response, HttpMethod.get);
            });
    }
}
