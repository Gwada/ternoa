/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   register.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:05:13 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/30 02:07:27 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterForm } from '../../../models/registerForm';
import { UserProvider } from '../../../providers/user/user';
import { AccountPage } from '../account';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  signUpForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBldr: FormBuilder,
              private userService: UserProvider,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBldr.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        plainPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      }
    );
  }

  onSubmit(): void {
    const registration: string = 'registration in progress...';
    const authentication: string = 'authentication in progress...';
    const signUpLdr = this.loadingCtrl.create({content: registration});
    const authLdr = this.loadingCtrl.create({content: authentication})
    const formValue: RegisterForm = this.signUpForm.value;
    const email: string = formValue.email;
    const password: string = formValue.plainPassword;
    formValue.username = formValue.email;

    if (this.signUpForm.valid) {
      signUpLdr.present();
      this.userService.signUp(formValue).then(
        () => {
          this.toogleLoader(signUpLdr, authLdr);
          this.userService.signIn({email: email, password: password}).then(
            (resp) => this.onSuccessSignup(authLdr, resp.firstName),
            (err) => this.onFaillureSignup(authLdr, err['hydra:description'])
          )
        },
        (error) => this.onFaillureSignup(signUpLdr, error['hydra:description'])
      );
    }
  }

  onSuccessSignup(toDismiss: Loading, message: string): void {
    toDismiss.dismiss();
    this.toastCtrl.create(
      {
        message: 'Welcome to ternoa ' + message,
        duration: 5000,
        position: 'bottom'
      }
    ).present();
    this.navCtrl.setRoot(AccountPage);
  }

  onFaillureSignup(toDismiss: Loading, message: string): void {
    const alert = this.alertCtrl.create({
      title: 'An error has occurred',
      subTitle: message,
      buttons: [
        {
          text: 'close',
          role: 'cancel'
        }
      ]
    });

    toDismiss.dismiss();
    alert.present();
  }

  toogleLoader(toDismiss: Loading, toPresent: Loading): void {
    toDismiss.dismiss();
    toPresent.present();
  }

  onGoToLoginPage(): void {
    this.navCtrl.setRoot(LoginPage);
  }

}