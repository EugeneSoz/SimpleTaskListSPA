import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Urls {
    private baseoptionsUrl: string = `/api/options`;
    dataOptions: string = `${this.baseoptionsUrl}/services`;
    seed: string = `${this.baseoptionsUrl}/seed`;

    private baseCategoryUrl: string = `/api/category`;
    storeCategories: string = `${this.baseCategoryUrl}/storecategories`;
    categories: string = `${this.baseCategoryUrl}/categories`;
    category: string = `${this.baseCategoryUrl}/category`;
    category_create: string = `${this.baseCategoryUrl}/create`;
    category_update: string = `${this.baseCategoryUrl}/update`;
    category_delete: string = `${this.baseCategoryUrl}/delete`;

    private baseTaskUrl: string = `/api/taskitem`;
    tasks: string = `${this.baseTaskUrl}/tasks`;
    task_create: string = `${this.baseTaskUrl}/create`;
    task_update: string = `${this.baseTaskUrl}/update`;
    task_delete: string = `${this.baseTaskUrl}/delete`;
}
