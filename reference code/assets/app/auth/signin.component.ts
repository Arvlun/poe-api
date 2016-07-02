import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';

import { AuthService } from './auth.service';
import { ErrorService } from '../errors/error.service';
import { User } from './user';

@Component({
    moduleId: module.id,
    selector: 'my-signin',
    template: `
        <section class="col-md-8 col-md-offset-2"> 
            <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()"> 
                <div class="form-group">
                    <label for="email">Email</label>
                    <input [ngFormControl]="myForm.find('email')" type="email" id="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input [ngFormControl]="myForm.find('password')" type="password" id="password" class="form-control">
                </div>
                <button type="submit" class="btn btn primary" [disabled]="!myForm.valid">Sign Up</button>
            </form>
        </section>
    `
})
export class SigninComponent implements OnInit {
    myForm: ControlGroup;

    constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private errorService: ErrorService ) {}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
            this.authService.signin(user)
                            .subscribe(
                                data => {
                                    localStorage.setItem('token', data.token);
                                    localStorage.setItem('user', data.userId);
                                    this.router.navigateByUrl('/');
                                },
                                error => this.errorService.handleError(error)
                            )
    }

    ngOnInit() { 
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required]
        });
    }

    private isEmail(control: Control): {[s: string]: boolean} {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return {invalidMail: true};
        }
    }
}