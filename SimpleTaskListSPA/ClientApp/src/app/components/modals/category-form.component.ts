import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../../services/category.service';
import { ModelErrors } from '../../models/forms/modelErrors';
import { EntityType } from '../../enums/entityType';
import { CategoryResponse } from '../../models/dataDTO/categoryResponse';
import { BaseFormComponent } from '../../viewmodels/baseForm';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../models/dataDTO/category';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
})
export class CategoryFormComponent extends BaseFormComponent implements OnInit {

    constructor(
        private _categoryService: CategoryService,
        public bsModalRef: BsModalRef) {

        super(new ModelErrors(), EntityType.Category);
    }

    newCategory: CategoryResponse = new CategoryResponse();

    //создаётся новая задача, или редактируется старая
    get isEditMode(): boolean {
        return this._categoryService.isFormInEditMode;
    }

    get submitBtnCssClass(): string {
        return this.isEditMode
            ? "btn btn-warning mr-2"
            : "btn btn-success mr-2";
    }

    get submitBtnTitle(): string {
        return this.isEditMode
            ? "Изменить"
            : "Создать";
    }

    get formHeader(): string {
        return this.isEditMode
            ? "Изменить список"
            : "Создать список";
    }

    get errors(): Array<string> {
        return this._categoryService.errors;
    }

    ngOnInit(): void {
        this.newCategory = this._categoryService.isFormInEditMode
            ? Object.assign(this.newCategory, this._categoryService.selectedCategory)
            : new CategoryResponse();
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            let category = new Category(this.newCategory.id, this.newCategory.name);
            if (this.isEditMode) {
                this._categoryService.updateCategory(category);
            }
            else {
                this._categoryService.createCategory(category);
            }
            this.newCategory = new CategoryResponse();
            form.reset();

            this.bsModalRef.hide();
        }
    }

    onResetForm(): void {
        this.bsModalRef.hide();
        this._categoryService.isFormInEditMode = false;
    }
}
