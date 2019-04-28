import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbars/toolbar.component';
import { ToolbarTitleComponent } from './components/toolbars/toolbar-title.component';
import { ActionsComponent } from './components/toolbars/actions.component';
import { CategoryFilterComponent } from './components/sidebar/category-filter.component';
import { SearchToolbarComponent } from './components/sidebar/search-toolbar.component';
import { ValidationComponent } from './components/shared/validation.component';
import { DeleteMessageComponent } from './components/modals/delete-message.component';
import { CategoryFormComponent } from './components/modals/category-form.component';
import { FoundListboxComponent } from './components/main/listboxes/found-listbox.component';
import { InboxListboxComponent } from './components/main/listboxes/inbox-listbox.component';
import { TaskboxComponent } from './components/main/taskbox.component';
import { TaskActionsComponent } from './components/main/task-actions.component';
import { MainLayoutComponent } from './components/layouts/main-layout.component';
import { TaskCreationComponent } from './components/main/task-creation.component';
import { OptionsLayoutComponent } from './components/layouts/options-layout.component';
import { DataOptionsComponent } from './components/options/data-options.component';
import { TaskFormComponent } from './components/actionbar/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/taskItem.service';

import { registerLocaleData } from '@angular/common';
import localeRu from "@angular/common/locales/ru";

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
defineLocale('ru', ruLocale); 

import { Subject } from 'rxjs';
import { CategoryService } from './services/category.service';
import { SpecialListboxComponent } from './components/main/listboxes/special-listbox.component';
import { RangeValidatorDirective } from './directives/range.directive';
import { MinValueValidatorDirective } from './directives/min-value.directive';
import { Errors_Received, ErrorsEventArgs } from './models/events/errorsEventArgs';
import { ServerValidationComponent } from './components/shared/server-validation.component';

registerLocaleData(localeRu, "ru");

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        ToolbarTitleComponent,
        ActionsComponent,
        CategoryFilterComponent,
        SearchToolbarComponent,
        ValidationComponent,
        DeleteMessageComponent,
        CategoryFormComponent,
        FoundListboxComponent,
        SpecialListboxComponent,
        InboxListboxComponent,
        TaskboxComponent,
        TaskActionsComponent,
        TaskCreationComponent,
        MainLayoutComponent,
        OptionsLayoutComponent,
        DataOptionsComponent,
        TaskFormComponent,
        ServerValidationComponent,
        RangeValidatorDirective,
        MinValueValidatorDirective,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot()
    ],
    providers: [
        TaskService,
        CategoryService,
        { provide: Errors_Received, useValue: new Subject<ErrorsEventArgs>() },
        { provide: LOCALE_ID, useValue: 'ru' }
    ],
    entryComponents: [CategoryFormComponent, DeleteMessageComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
