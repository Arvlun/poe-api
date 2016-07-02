import { Component, OnInit } from '@angular/core';

import { Message } from './message';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { ErrorService } from '../errors/error.service';

@Component({
    moduleId: module.id,
    selector: 'my-message-list',
    template: `<section class="col-md-8 col-md-offset-2"> 
                <my-message *ngFor="let message of messages" [message]="message" (editClicked)="message.content = $event"></my-message>
    </section>`,
    directives: [ MessageComponent ]
})
export class MessageListComponent implements OnInit {

    constructor(private messageService: MessageService, private errorService: ErrorService) {}

    messages: Message[];

    ngOnInit() {
        this.messageService.getMessages()
                           .subscribe(
                               messages => {
                                   this.messages = messages;
                                   this.messageService.messages = messages;
                               },
                               error => this.errorService.handleError(error)
                           );
    }

}