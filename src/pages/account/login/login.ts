/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:25:46 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/30 02:49:54 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../../providers/user/user';
import { LoginForm } from '../../../models/LoginForm';
import { RequestPasswordResettingPage } from '../request-password-resetting/request-password-resetting';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../../tabs/tabs';

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
              private navCtrl: NavController) {
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
        this.navCtrl.setRoot(TabsPage);
      },
      (err) => loader.dismiss()
    );
  }

  onGoToRequestPasswordResetting() {
    this.navCtrl.setRoot(RequestPasswordResettingPage);
  }

  onGoToRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  onGoToTabsPage() {
    this.navCtrl.setRoot(TabsPage);
  }
}
