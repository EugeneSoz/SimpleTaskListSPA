import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";

import { HttpMethod } from "./httpMethod";
import { HttpStatusCode } from '../enums/httpStatusCode';


@Injectable({ providedIn: 'root' })
export class RestDatasource {
    constructor(private _http: HttpClient) { }

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
        return this._http.request<TResponse>(verb, url, { body, observe: "response" });
    }
}
