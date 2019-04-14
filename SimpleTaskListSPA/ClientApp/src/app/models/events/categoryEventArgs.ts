import { InjectionToken } from '@angular/core';

export class CategoryEventArgs {
    constructor(
        public selectedCategoryId: number,
        public searchTerm: string) { }
}

export const Category_Changed = new InjectionToken("");
