/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   request-password-resetting.ts                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/29 13:07:45 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/29 19:18:00 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, LoadingController, ToastController, Loading, AlertController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestProvider } from '../../../providers/request/request';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-request-password-resetting',
  templateUrl: 'request-password-resetting.html',
})
export class RequestPasswordResettingPage implements OnInit {
  passwordResettingForm: FormGroup;

  constructor(private viewCtrl: ViewController,
              private formBdr: FormBuilder,
              private reqService: RequestProvider,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.passwordResettingForm = this.formBdr.group({
      email: ['', Validators.required]}
    );
  }

  onSubmit() {
    const data = [
      ['email', this.passwordResettingForm.get('email').value]
    ];
    const loader = this.loadingCtrl.create({content: 'request in progress...'});
    const url = 'request-password-resetting';

    loader.present();
    if (this.passwordResettingForm.valid) {
      this.reqService.post(url, this.reqService.setBody(data)).then(
        () => this.toastDisplay(loader, 'reset email generated and sent...'),
        (err) => this.alertDisplay(loader, err)
      )
    }
  }

  alertDisplay(loader: Loading, err: any): void {
    let title = 'ERROR';
    let  subTitle = 'Technical problem';
    const alert = this.alertCtrl.create({
      title: err && err['hydra:title'] ? err['hydra:title'] : title,
      subTitle: err && err['hydra:description'] ? err['hydra:description'] : subTitle,
      buttons: [
        {
          text: 'close',
          handler: () => this.dismissModal()
        }
      ]
    });

    loader.dismiss();
    alert.present();
  }

  toastDisplay(loader: Loading, message: string):void {
    loader.dismiss();
    this.toastCtrl.create(
      {
        message: message,
        duration: 3000,
        position: 'bottom'
      }
    ).present();
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onGoToLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
