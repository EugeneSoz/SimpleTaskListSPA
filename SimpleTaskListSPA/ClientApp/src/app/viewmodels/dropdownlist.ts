import { NameHelper } from '../helpers/nameHelper';
import { TaskItem } from '../models/dataDTO/taskItem';

//класс содержит элементы списка в панели Toolbar
export class ListItem {
    constructor(
        public propertyName: string,
        public name: string,
        public href: string,
        public hasDivider: boolean) { }

}

export class DropdownList {
    listItems: Array<ListItem>;

    createSortingList(href: string): void
    {
        let nh: NameHelper = new NameHelper();
        this.listItems = new Array<ListItem>(
            new ListItem("", "Сортировать по", href, false),
            new ListItem("desc", "По алфавиту", href, true),
            new ListItem(nh.nameof<TaskItem>("name"), "Названию", href, false),
            new ListItem(nh.nameof<TaskItem>("creationDate"), "Дате создания", href, false),
            new ListItem(nh.nameof<TaskItem>("planningDate"), "Дате выполнения", href, false),
            new ListItem(nh.nameof<TaskItem>("isImportant"), "Важности", href, false));
    }
}
