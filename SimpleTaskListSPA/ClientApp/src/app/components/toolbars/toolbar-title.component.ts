import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-toolbar-title',
    templateUrl: './toolbar-title.component.html',
})
export class ToolbarTitleComponent {

    constructor(
        private _categoryService: CategoryService) { }

    get selectedCategoryTitle(): string {
        return this._categoryService.selectedCategoryTitle == null
            || this._categoryService.selectedCategoryTitle == ""
            ? "Категория"
            : this._categoryService.selectedCategoryTitle;
    }
}
