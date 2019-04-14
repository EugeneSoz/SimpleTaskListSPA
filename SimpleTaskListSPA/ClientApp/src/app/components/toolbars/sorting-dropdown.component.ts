import { Component } from '@angular/core';
import { TaskService } from '../../services/taskItem.service';
import { ListItem } from '../../viewmodels/dropdownlist';

@Component({
    selector: 'app-sorting-dropdown',
    templateUrl: './sorting-dropdown.component.html',
})
export class SortingDropdownComponent {

    constructor(
        private _taskService: TaskService) { }

    get listItems(): Array<ListItem> {
        return this._taskService.dropdownlist.listItems;
    }

    //выделить в выпадающем списке свойство сортировки
    setElementCssClass(listItem: ListItem): string {
        let cssClass: string = null;

        if (listItem.propertyName == "desc") {
            cssClass = this._taskService.queryOptions.descendingOrder ? "" : " active";
        }
        else {
            cssClass = this._taskService.queryOptions.sortPropertyName == listItem.propertyName
                ? " active"
                : "";
        }

        return `dropdown-item${cssClass}`;
    }

    sortBy(listItem: ListItem): void {
        this._taskService.sortBy(listItem.propertyName);
    }
}
