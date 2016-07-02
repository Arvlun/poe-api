import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { ErrorComponent } from './errors/error.component';

@Component({
    selector: 'my-app',
    templateUrl: 'js/app/app.component.html',
    directives: [ ROUTER_DIRECTIVES, HeaderComponent, ErrorComponent ]
})
@Routes([
    {path: '/', component: MessagesComponent },
    {path: '/auth', component: AuthenticationComponent }
])
export class AppComponent {
          
} 