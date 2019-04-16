import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components/layouts/main-layout.component';
import { DataOptionsComponent } from './components/options/data-options.component';
import { InboxListboxComponent } from './components/main/listboxes/inbox-listbox.component';
import { FoundListboxComponent } from './components/main/listboxes/found-listbox.component';
import { SpecialListboxComponent } from './components/main/listboxes/special-listbox.component';

const routes: Routes = [
    {
        path: "", component: MainLayoutComponent,
        children: [
            { path: "inbox", component: InboxListboxComponent },
            { path: "", component: InboxListboxComponent },
            { path: "found", component: FoundListboxComponent },
            { path: "starred", component: SpecialListboxComponent },
            { path: "today", component: SpecialListboxComponent },
            { path: "week", component: SpecialListboxComponent },
        ]
    },
    { path: "options", component: DataOptionsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
