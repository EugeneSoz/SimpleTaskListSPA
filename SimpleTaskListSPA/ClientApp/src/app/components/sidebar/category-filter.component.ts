import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { DisplayedCategory } from '../../models/displayedCategory';
import { CategoryResponse } from '../../models/dataDTO/categoryResponse';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CategoryFormComponent } from '../modals/category-form.component';

@Component({
    selector: 'app-category-filter',
    templateUrl: './category-filter.component.html',
})
export class CategoryFilterComponent implements OnInit {

    constructor(
        private _categoryService: CategoryService,
        private modalService: BsModalService) { }

    get categories(): Array<DisplayedCategory> {
        return this._categoryService.displayedCategories;
    }

    ngOnInit(): void {
        this._categoryService.getCategories();
    }

    onShowCreationForm(): void {
        this._categoryService.isFormInEditMode = false;
        this.modalService.show(CategoryFormComponent);
    }

    onShowEditForm(): void {
        this._categoryService.isFormInEditMode = true;
        this.modalService.show(CategoryFormComponent);
    }

    //не учитываем специальные категории и категорию с id = 1
    onShowEditButton(category: CategoryResponse): boolean {
        return category.id > 1 && category.id == this._categoryService.selectedCategory.id
            ? true
            : false;
    }


    getLinkElementCssClass(category: CategoryResponse): string {
        return this._categoryService.selectedCategory.id == category.id
            ? "active"
            : "";
    }

    onFilterByCategory(category: CategoryResponse) {
        this._categoryService.filterByCategory(category);
    }
}
