import { Injectable } from '@angular/core';

export class QueryOptions {
    constructor(
        public sortPropertyName?: string,
        public descendingOrder?: boolean,
        public searchPropertyNames?: Array<string>,
        public searchTerm?: string,
        public selectedCategoryId?: number) {
    }

    resetToDefault() {
        this.sortPropertyName = "";
        this.descendingOrder = false;
        this.searchPropertyNames = null;
        this.searchTerm = "";
        this.selectedCategoryId = null;
    }
}
