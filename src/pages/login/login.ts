/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:25:46 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/20 16:16:12 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { IonicPage, LoadingController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { LoginForm } from '../../models/LoginForm';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              private userService: UserProvider) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  onSubmitForm() {
    const formValue: LoginForm = this.authForm.value;
    const loader = this.loadingCtrl.create({content: 'request in progress'});

    loader.present();
    this.userService.signIn(formValue).then(
      (resp) => {
        loader.dismiss();
        console.log(resp);
      },
      (err) => {
        loader.dismiss();
        console.log(err);
      }
    );
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }
}
