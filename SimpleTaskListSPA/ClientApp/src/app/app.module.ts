import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbars/toolbar.component';
import { ToolbarTitleComponent } from './components/toolbars/toolbar-title.component';
import { ActionsComponent } from './components/toolbars/actions.component';
import { SortingDropdownComponent } from './components/toolbars/sorting-dropdown.component';
import { CategoryFilterComponent } from './components/sidebar/category-filter.component';
import { SearchToolbarComponent } from './components/sidebar/search-toolbar.component';
import { ValidationComponent } from './components/shared/validation.component';
import { DeleteMessageComponent } from './components/modals/delete-message.component';
import { CategoryFormComponent } from './components/modals/category-form.component';
import { FoundListboxComponent } from './components/main/listboxes/found-listbox.component';
import { StarredListboxComponent } from './components/main/listboxes/starred-listbox.component';
import { InboxListboxComponent } from './components/main/listboxes/inbox-listbox.component';
import { TodayListboxComponent } from './components/main/listboxes/today-listbox.component';
import { WeekListboxComponent } from './components/main/listboxes/week-listbox.component';
import { TaskboxComponent } from './components/main/taskbox.component';
import { TaskActionsComponent } from './components/main/task-actions.component';
import { MainLayoutComponent } from './components/layouts/main-layout.component';
import { TaskCreationComponent } from './components/main/task-creation.component';
import { OptionsLayoutComponent } from './components/layouts/options-layout.component';
import { DataOptionsComponent } from './components/options/data-options.component';
import { TaskFormComponent } from './components/actionbar/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/taskItem.service';

import localeRu from "@angular/common/locales/ru";
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRu, "ru");

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        ToolbarTitleComponent,
        ActionsComponent,
        SortingDropdownComponent,
        CategoryFilterComponent,
        SearchToolbarComponent,
        ValidationComponent,
        DeleteMessageComponent,
        CategoryFormComponent,
        FoundListboxComponent,
        StarredListboxComponent,
        InboxListboxComponent,
        TodayListboxComponent,
        WeekListboxComponent,
        TaskboxComponent,
        TaskActionsComponent,
        TaskCreationComponent,
        MainLayoutComponent,
        OptionsLayoutComponent,
        DataOptionsComponent,
        TaskFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule { }
