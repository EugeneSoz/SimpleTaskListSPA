import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/taskItem.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntityType } from '../../enums/entityType';

@Component({
    selector: 'app-delete-message',
    templateUrl: './delete-message.component.html',
})
export class DeleteMessageComponent implements OnInit {

    constructor(
        private _categoryService: CategoryService,
        private _taskService: TaskService,
        public bsModalRef: BsModalRef) { }

    entityType: EntityType 
    ngOnInit() {
    }

}
