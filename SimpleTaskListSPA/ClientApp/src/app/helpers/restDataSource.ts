import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";

import { HttpMethod } from "../enums/httpMethod";
import { ServerErrors } from '../models/forms/serverErrors';
import { QueryOptions } from '../models/dataDTO/queryOptions';

@Injectable({ providedIn: 'root' })
export class RestDatasource {
    constructor(private _http: HttpClient) { }

    getResponseBody<TReturnValue>(response: HttpResponse<TReturnValue>, method: HttpMethod): TReturnValue {
        let result: TReturnValue = null;
        switch (method) {
            case HttpMethod.GET:
                result = response.status == 200
                    ? response.body
                    : null;
                break;
            case HttpMethod.POSTGET:
                result = response.status == 200
                    ? response.body
                    : null;
                break;
            case HttpMethod.POST:
                result = response.status == 201
                    ? null
                    : response.body;
                break;
            case HttpMethod.PUT:
                result = response.status == 200
                    ? null
                    : response.body;
                break;
        }

        return result;
    }

    getBoolResponseBody(response: HttpResponse<boolean>, method: HttpMethod): boolean {
        let boolResult: boolean = null;
        switch (method) {
            case HttpMethod.DELETE:
                boolResult = response.status == 204
                    ? true
                    : false;
                break;
        }

        return boolResult;
    }

    getAll<TReturnValue>(url: string): Observable<HttpResponse<TReturnValue>> {
        let result: Observable<HttpResponse<TReturnValue>> =
            this.sendRequest<TReturnValue, boolean>("get", url);

        return result;
    }

    receiveAll<TReturnValue>(url: string, options: QueryOptions): Observable<HttpResponse<TReturnValue>> {
        let result: Observable<HttpResponse<TReturnValue>> =
            this.sendRequest<TReturnValue, QueryOptions>("post", url, options);

        return result;
    }

    create<TParameter>(url: string, model: TParameter): Observable<HttpResponse<ServerErrors>> {
        let result: Observable<HttpResponse<ServerErrors>> =
            this.sendRequest<ServerErrors, TParameter>("post", url, model);

        return result;
    }

    createObject<TParameter, TReturnValue>(url: string, model: TParameter): Observable<HttpResponse<TReturnValue>> {
        let result: Observable<HttpResponse<TReturnValue>> =
            this.sendRequest<TReturnValue, TParameter>("post", url, model);

        return result;
    }

    update<TParameter>(url: string, model: TParameter): Observable<HttpResponse<ServerErrors>> {
        let result: Observable<HttpResponse<ServerErrors>> =
            this.sendRequest<ServerErrors, TParameter>("put", url, model);

        return result;
    }

    delete<TParameter>(url: string, model: TParameter): Observable<HttpResponse<boolean>> {
        let result: Observable<HttpResponse<boolean>> =
            this.sendRequest<boolean, TParameter>("delete", url, model);

        return result;
    }

    //вспомогательный метод для сериализации объекта и отправки его на сервер
    private sendRequest<TReturnValue, TParameter>(verb: string,
        url: string, body?: TParameter): Observable<HttpResponse<TReturnValue>> {
        return this._http.request<TReturnValue>(verb, url, { body, observe: "response" });
    }
}
