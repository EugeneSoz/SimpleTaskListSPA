import { InjectionToken } from '@angular/core';

export class ErrorsEventArgs {
    constructor(
        public errors: Array<string>) { }
}

export const Errors_Received = new InjectionToken("");
