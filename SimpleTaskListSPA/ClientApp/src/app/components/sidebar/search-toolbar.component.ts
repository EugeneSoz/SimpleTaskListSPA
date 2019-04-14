import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-search-toolbar',
    templateUrl: './search-toolbar.component.html',
})
export class SearchToolbarComponent {

    constructor(
        private _categoryService: CategoryService) { }

    searchTerm: string = "";

    get isCancelButtonVisible(): boolean {
        return this.searchTerm == "" ? false : true;
    }
}
