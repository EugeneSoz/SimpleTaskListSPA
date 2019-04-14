import { CategoryFilterType } from '../enums/categoryFilterType';
import { CategoryResponse } from './dataDTO/categoryResponse';

export class DisplayedCategory {
    constructor(category: CategoryResponse) {
        this.category = category;
        this.setSymbol(category);
        this.setColour(category);
    }

    category: CategoryResponse = null;
    iconColour: string = null;
    iconSymbol: string = null;

    private setSymbol(category: CategoryResponse): void
    {
        switch (category.id) {
            case 1:
                this.iconSymbol = "<i class='fas fa-inbox'></i>";
                break;
            case CategoryFilterType.starred:
                this.iconSymbol = "<i class='fas fa-star'></i>";
                break;
            case CategoryFilterType.today:
                this.iconSymbol = "<i class='fas fa-calendar-minus'></i>";
                break;
            case CategoryFilterType.week:
                this.iconSymbol = "<i class='fas fa-calendar-minus'></i>";
                break;
            default:
                this.iconSymbol = "<i class='fas fa-align-justify'></i>";
                break;
        }
    }

    private setColour(category: CategoryResponse): void
    {
        switch (category.id) {
            case 1:
                this.iconColour = "#2b8dec";
                break;
            case CategoryFilterType.starred:
                this.iconColour = "#db4c3f";
                break;
            case CategoryFilterType.today:
                this.iconColour = "#5fa004";
                break;
            case CategoryFilterType.week:
                this.iconColour = "#e29600";
                break;
            default:
                this.iconColour = "#b9b9b9";
                break;
        }
    }
}
