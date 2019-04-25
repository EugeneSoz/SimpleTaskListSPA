import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { HttpMethod } from "./httpMethod";
import { HttpStatusCode } from '../enums/httpStatusCode';


@Injectable({ providedIn: 'root' })
export class RestDatasource {
    constructor(
        private _http: HttpClient) { }

    private _errors: Array<string> = null;

    getResult<TBody>(response: HttpResponse<TBody>, method: HttpMethod): TBody {
        let result: TBody = null;
        switch (method) {
            case HttpMethod.get:
            case HttpMethod.post:
                result = response.status == HttpStatusCode.OK
                    ? response.body
                    : null;
                break;
            case HttpMethod.post:
                result = response.status == HttpStatusCode.Created
                    ? null
                    : response.body;
                break;
            case HttpMethod.put:
                result = response.status == HttpStatusCode.OK
                    ? null
                    : response.body;
                break;
        }

        return result;
    }

    getBoolResult(response: HttpResponse<boolean>, method: HttpMethod): boolean {
        let boolResult: boolean = null;
        switch (method) {
            case HttpMethod.delete:
                boolResult = response.status == HttpStatusCode.NoContent
                    ? true
                    : false;
                break;
        }

        return boolResult;
    }

    //вспомогательный метод для сериализации объекта и отправки его на сервер
    sendRequest<TResponse, TBody>(verb: string,
        url: string, body?: TBody): Observable<HttpResponse<TResponse>> {
        return this._http.request<TResponse>(verb, url, { body, observe: "response" })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Произошла ошибка:', error.error.message);
        }
        else {
            this._errors = <string[]>error.error
        }
        // return an observable with a user-facing error message
        return throwError(
            this._errors);
    };
}
