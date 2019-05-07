import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Urls {
    private baseoptionsUrl: string = `/api/options`;
    dataOptions: string = `${this.baseoptionsUrl}/services`;
    options_seed: string = `${this.baseoptionsUrl}/seed`;
    options_apply: string = `${this.baseoptionsUrl}/apply`;
    options_save: string = `${this.baseoptionsUrl}/save`;
    options_clear: string = `${this.baseoptionsUrl}/clear`;


    private baseCategoryUrl: string = `/api/category`;
    categories: string = `${this.baseCategoryUrl}/categories`;
    category: string = `${this.baseCategoryUrl}/category`;
    category_create: string = `${this.baseCategoryUrl}/create`;
    category_update: string = `${this.baseCategoryUrl}/update`;
    category_delete: string = `${this.baseCategoryUrl}/delete`;

    private baseTaskUrl: string = `/api/taskitem`;
    task: string = `${this.baseTaskUrl}/task`;
    tasks: string = `${this.baseTaskUrl}/tasks`;
    task_create: string = `${this.baseTaskUrl}/create`;
    task_update: string = `${this.baseTaskUrl}/update`;
    task_delete: string = `${this.baseTaskUrl}/delete`;
    task_setdate: string = `${this.baseTaskUrl}/setdate`;
}
