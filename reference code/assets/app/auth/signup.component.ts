import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';

import { AuthService } from './auth.service';
import { ErrorService } from '../errors/error.service';
import { User } from './user';

@Component({
    moduleId: module.id,
    selector: 'my-signup',
    template: `
        <section class="col-md-8 col-md-offset-2"> 
            <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()"> 
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input [ngFormControl]="myForm.find('firstName')" type="text" id="firstName" class="form-control">
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input [ngFormControl]="myForm.find('lastName')" type="text" id="lastName" class="form-control">
                </div>
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
export class SignupComponent implements OnInit {
    myForm: ControlGroup;

    constructor( private fb: FormBuilder, private authService: AuthService, private errorService: ErrorService ) {}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        this.authService.signup(user)
                        .subscribe(
                            data => console.log(data),
                            error => this.errorService.handleError(error)
                        );
    }

    ngOnInit() { 
        this.myForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
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