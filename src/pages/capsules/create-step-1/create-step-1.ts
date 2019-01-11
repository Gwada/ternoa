/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-step-1.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 15:14:50 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/11 16:35:00 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-step-1',
  templateUrl: 'create-step-1.html',
})
export class CreateStep_1Page {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateStep_1Page');
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

}
