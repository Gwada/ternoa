/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   account.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:26:27 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/19 17:01:12 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, Injectable } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
