/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   account.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:26:27 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/29 19:27:25 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from './login/login';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(private userService: UserProvider,
              private navCtrl: NavController) {
  }

  onLogout() {
    this.userService.logOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
