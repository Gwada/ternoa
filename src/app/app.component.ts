/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.component.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:04:19 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/30 04:11:29 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/account/login/login';
import { UserProvider } from '../providers/user/user';
import { Storage } from '@ionic/storage';
import { RequestProvider } from '../providers/request/request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  
  constructor(platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private userService: UserProvider,
              private storage: Storage,
              private reqService: RequestProvider) {
    platform.ready().then(
      () => this.storage.get('ternoaToken').then(
        (token) => this.onGotToken(token),
        (err) => this.initApp()
      )
    );
  }

  initApp(): void {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  onGotToken(token: string): void {
    if (!token) {
      this.initApp();
    } else {
      this.reqService.setToken(token);
      this.userService.getProfile().then(
        () => {
          this.rootPage = TabsPage;
          this.initApp();
        },
        (err) => {
          this.storage.remove('ternoaToken');
          this.initApp();
        }
      );
    }
  }
}
