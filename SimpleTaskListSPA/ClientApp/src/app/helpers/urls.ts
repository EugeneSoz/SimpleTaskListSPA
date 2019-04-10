import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Urls {
    private baseoptionsUrl: string = `/api/options`;
    dataOptions: string = `${this.baseoptionsUrl}/dbServices`;
    seed: string = `${this.baseoptionsUrl}/seed`;

    private baseCategoryUrl: string = `/api/category`;
    storeCategories: string = `${this.baseCategoryUrl}/storecategories`;
    categories: string = `${this.baseCategoryUrl}/categories`;
    category: string = `${this.baseCategoryUrl}/category`;
    category_create: string = `${this.baseCategoryUrl}/create`;
    category_update: string = `${this.baseCategoryUrl}/update`;
    category_delete: string = `${this.baseCategoryUrl}/delete`;

    private baseBookUrl: string = `/api/book`;
    books: string = `${this.baseBookUrl}/books`;
    book: string = `${this.baseBookUrl}/book`;
    book_create: string = `${this.baseBookUrl}/create`;
    book_update: string = `${this.baseBookUrl}/update`;
    book_delete: string = `${this.baseBookUrl}/delete`;

    private basePublisherUrl: string = `/api/publisher`;
    publishers: string = `${this.basePublisherUrl}/publishers`;
    publisher: string = `${this.basePublisherUrl}/publisher`;
    publisher_create: string = `${this.basePublisherUrl}/create`;
    publisher_update: string = `${this.basePublisherUrl}/update`;
    publisher_delete: string = `${this.basePublisherUrl}/delete`;

    private baseSessionUrl: string = `/api/session`;
    session: string = `${this.baseSessionUrl}/cart`;

    private baseOrderUrl: string = `/api/orders`;
    orders: string = `${this.baseOrderUrl}`;

    private baseAccountUrl: string = `/api/acount`;
    login: string = `${this.baseAccountUrl}/login`;
    logout: string = `${this.baseAccountUrl}/logout`;
}
