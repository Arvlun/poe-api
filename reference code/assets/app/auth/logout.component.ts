import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-logout',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </section>
    `
})
export class LogoutComponent {

    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['Signin']);
    }
}