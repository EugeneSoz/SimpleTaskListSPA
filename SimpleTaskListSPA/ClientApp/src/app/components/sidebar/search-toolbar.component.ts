import { Component, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-search-toolbar',
    templateUrl: './search-toolbar.component.html',
})
export class SearchToolbarComponent {

    constructor(
        private _categoryService: CategoryService) { }

    @ViewChild('searchInput') searchElement: ElementRef<HTMLInputElement>;

    searchTerm: string = "";

    get isCancelButtonVisible(): boolean {
        return this.searchTerm == "" ? false : true;
    }

    onInput(value: string) {
        this.searchTerm = value;
        if (this.searchTerm.length == 0) {
            this.onClearSearchTerm();
        }
    }

    onClearSearchTerm(): void {
        this.searchTerm = "";
        this._categoryService.resetSearchResult();
        this.searchElement.nativeElement.blur();
    }

    onSearch(): void {
        this._categoryService.searchByName(this.searchTerm);
    }
}
