import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';

import { Urls } from '../helpers/urls';
import { RestDatasource } from '../helpers/restDataSource';
import { DisplayedCategory } from '../models/displayedCategory';
import { CategoryFilterType } from '../enums/categoryFilterType';
import { CategoryResponse } from '../models/dataDTO/categoryResponse';
import { HttpMethod } from '../helpers/httpMethod';
import { CategoryEventArgs, Category_Changed } from '../models/events/categoryEventArgs';
import { TaskService } from './taskItem.service';

@Injectable()
export class CategoryService {
    constructor(
        private _url: Urls,
        private _rest: RestDatasource,
        private _router: Router,
        private _taskService: TaskService) { }

    currentPageUrl: string = null;
    selectedCategoryTitle: string = null;
    private _selectedCategoryBeforeSearchWasUsed: CategoryResponse = null;
    private _selectedCategory: CategoryResponse = new CategoryResponse();

    //свойство используется для построения списка категорий
    displayedCategories: Array<DisplayedCategory> = new Array<DisplayedCategory>();
    categories: Array<CategoryResponse> = new Array<CategoryResponse>();

    get selectedCategory(): CategoryResponse {
        return this._selectedCategory;
    }

    set selectedCategory(value: CategoryResponse) {
        if (value.id == 0) {
            this._selectedCategoryBeforeSearchWasUsed = this._selectedCategory;
            this._selectedCategory = value;
        }
        else {
            this._selectedCategory = value;
            this._selectedCategoryBeforeSearchWasUsed = null;
        }
        this._taskService.queryOptions.selectedCategoryId = this._selectedCategory.id;
        this.selectedCategoryTitle = this._selectedCategory.name;
    }

    //загрузить категории с сервера
    getCategories() {
        this._rest.sendRequest<Array<CategoryResponse>, {}>(HttpMethod.get, this._url.categories)
            .subscribe(response => {
                let cat: Array<CategoryResponse> = this._rest.getResult(response, HttpMethod.get);
                if (cat != null) {
                    this.categories = cat.filter(c => c.id > 0);
                    if (this.selectedCategory.id == 0) {
                        let minCategoryId = Math.min(...this.categories.map(c => c.id));
                        this.selectedCategory = cat.find(c => c.id == minCategoryId);
                        this.currentPageUrl = this.getPageUrl(this._selectedCategory.id);
                    }
                }

                this.displayedCategories = this.createDisplayedCategoriesList(cat);
            });
    }

    filterByCategory(category: CategoryResponse): void {
        this.selectedCategory = category;
        this._taskService.queryOptions.selectedCategoryId = category.id;

        let url = this.getPageUrl(category.id);

        if (url == this.currentPageUrl) {
            this._taskService.recieveTasks();
        }
        else {
            this._router.navigateByUrl(url);
        }
        this.currentPageUrl = url;
    }

    searchByName(searchTerm: string): void {

    }

    private createDisplayedCategoriesList(categories: Array<CategoryResponse>): Array<DisplayedCategory>
    {
        let displayedCategories = new Array<DisplayedCategory>();
        categories.forEach(c => displayedCategories.push(new DisplayedCategory(c)));

        return displayedCategories;
    }

    private getPageUrl(categoryId: number): string {
        let url: string;
        switch (categoryId) {
            case 0:
                url = "/found";
                break;
            case CategoryFilterType.starred:
                url = "/starred";
                break;
            case CategoryFilterType.today:
                url = "/today";
                break;
            case CategoryFilterType.week:
                url = "/week";
                break;
            default:
                url = "/";
                break;
        }

        return url;
    }
}
