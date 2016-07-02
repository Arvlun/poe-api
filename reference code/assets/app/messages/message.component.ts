import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from './message';
import { MessageService } from './message.service';
import { ErrorService } from '../errors/error.service';

@Component({
    moduleId: module.id,
    selector: 'my-message',
    templateUrl: 'message.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%
        }
    `]
})
export class MessageComponent {
   @Input() message: Message;
   @Output() editClicked = new EventEmitter<string>();

   constructor (private messageService: MessageService, private errorService: ErrorService) {}

   onEdit() {
       this.messageService.editMessage(this.message);
   }

   onDelete() {
       this.messageService.deleteMessage(this.message)
                          .subscribe(
                             data => console.log(data),
                             error => this.errorService.handleError(error)
                          );
   }

   belongsToUser() {
       return localStorage.getItem('user') == this.message.userId;
   }
}