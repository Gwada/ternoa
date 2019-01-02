/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:25:46 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/01 16:47:00 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, App } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../../providers/user/user';
import { LoginForm } from '../../../models/LoginForm';
import { RequestPasswordResettingPage } from '../request-password-resetting/request-password-resetting';
import { TabsPage } from '../../tabs/tabs';
import { AccountPage } from '../account';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private userService: UserProvider,
              private navCtrl: NavController,
              private app: App) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      }
    );
  }

  onSubmit() {
    const formValue: LoginForm = this.authForm.value;
    const loader = this.loadingCtrl.create({content: 'request in progress'});

    loader.present();
    this.userService.signIn(formValue).then(
      (resp) => {
        loader.dismiss();
        // replace this line in real mode
        this.navCtrl.setRoot(this.app.getActiveNavs()[0].getType() !== 'tab' ? TabsPage : AccountPage);
        // this.navCtrl.setRoot(TabsPage);
      },
      (err) => loader.dismiss()
    );
  }

  onGoToRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  onGoToRequestPasswordResetting() {
    this.navCtrl.setRoot(RequestPasswordResettingPage);
  }
}
