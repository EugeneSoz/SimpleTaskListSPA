import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Urls } from '../helpers/urls';
import { RestDatasource } from '../helpers/restDataSource';
import { DisplayedCategory } from '../models/displayedCategory';
import { CategoryFilterType } from '../enums/categoryFilterType';
import { CategoryResponse } from '../models/dataDTO/categoryResponse';
import { HttpMethod } from '../helpers/httpMethod';
import { TaskService } from './taskItem.service';
import { Category } from '../models/dataDTO/category';

@Injectable()
export class CategoryService {
    constructor(
        private _url: Urls,
        private _rest: RestDatasource,
        private _router: Router,
        private _taskService: TaskService) {

        _taskService.tasksChanged.subscribe(response => {
            if (response == true) {
                this.getCategories();
            }
        });
    }

    //ошибки полученные с сервера
    errors: Array<string> = null;
    currentPageUrl: string = null;
    selectedCategoryTitle: string = null;
    private _selectedCategoryBeforeSearchWasUsed: CategoryResponse = null;
    private _selectedCategory: CategoryResponse = new CategoryResponse();
    private _searchWasUsed: boolean = false;

    //свойство используется для построения списка категорий
    displayedCategories: Array<DisplayedCategory> = new Array<DisplayedCategory>();
    category: Category = null;
    categories: Array<CategoryResponse> = new Array<CategoryResponse>();
    isFormInEditMode: boolean = false;

    selectedCategoryChanged: Subject<boolean> = new Subject<boolean>();

    get selectedCategory(): CategoryResponse {
        return this._selectedCategory;
    }

    set selectedCategory(value: CategoryResponse) {
        if (value.id == 0) {
            if (!this.searchWasUsed) {
                this._selectedCategoryBeforeSearchWasUsed = this._selectedCategory;
            }
            this._selectedCategory = value;
        }
        else {
            this._selectedCategory = value;
            this._selectedCategoryBeforeSearchWasUsed = null;
        }
        this._taskService.queryOptions.selectedCategoryId = this._selectedCategory.id;
        this.selectedCategoryTitle = this._selectedCategory.name;
    }

    get searchWasUsed(): boolean {
        return this._searchWasUsed;
    }

    set searchWasUsed(value: boolean) {
        this._searchWasUsed = value;
        this.selectedCategoryTitle = this._searchWasUsed
            ? this._taskService.queryOptions.searchTerm
            : this.selectedCategory.name;
    }

    getCategory(id: number): void {
        this._rest.sendRequest<Category, {}>(HttpMethod.get, `${this._url.category}/${id}`)
            .subscribe(response => {
                this.category = this._rest.getResult(response, HttpMethod.get);
            });
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

    createCategory(category: Category): void {
        this._rest.sendRequest<{}, Category>(HttpMethod.post, this._url.category_create, category)
            .subscribe(
                () => {
                    this.getCategories();
                    this._taskService.recieveTasks();
                },
                (error) => this.errors = error);
    }

    updateCategory(category: Category): void {
        this._rest.sendRequest<{}, Category>(HttpMethod.put, this._url.category_update, category)
            .subscribe(
                () => {
                    this.getCategories();
                    this._taskService.recieveTasks();
                },
                (error) => this.errors = error);
    }

    deleteCategory(): void {
        this._rest.sendRequest<boolean, Category>(HttpMethod.delete, this._url.category_delete,
            this.category)
            .subscribe(response => {
                let isOk: boolean = this._rest.getBoolResult(response, HttpMethod.delete);
                if (isOk) {
                    this.getCategories();
                    this._taskService.recieveTasks();
                    this.category = null;
                }
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

    filterByHomeCategory(): void {
        let minCategoryId = Math.min(...this.categories.map(c => c.id));
        let homeCategory: CategoryResponse =
            this.categories.find(c => c.id == minCategoryId);
        this.filterByCategory(homeCategory);
    }

    searchByName(searchTerm: string): void {
        this._taskService.queryOptions.searchTerm = searchTerm;
        this.selectedCategory = new CategoryResponse();
        let url = this.getPageUrl(0);

        if (url == this.currentPageUrl) {
            this._taskService.recieveTasks();
        }
        else {
            this._router.navigateByUrl(url);
        }
        this.currentPageUrl = url;
        this.searchWasUsed = true;
    }

    resetSearchResult(): void {
        //исли поиск произведён
        if (this._searchWasUsed) {
            this._taskService.queryOptions.searchTerm = "";
            this.selectedCategory = this._selectedCategoryBeforeSearchWasUsed;
            this.currentPageUrl = this.getPageUrl(this._selectedCategory.id);

            this._router.navigateByUrl(this.currentPageUrl);
            this.searchWasUsed = false;
        }
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
