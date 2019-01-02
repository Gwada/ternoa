/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   account.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:26:27 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/01 13:50:58 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, Injectable } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
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
              private app: App) {
  }

  onLogout() {
    this.userService.logOut();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
