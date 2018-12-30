/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.component.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:04:19 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/29 18:53:39 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Subscription } from 'rxjs/Subscription';
import { LoginPage } from '../pages/account/login/login';
import { RegisterPage } from '../pages/account/register/register';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy {
  // @ViewChild('content') content: NavController;

  tabsPage: any = TabsPage;
  loginPage: any = LoginPage;
  registerPage: any = RegisterPage
  isAuth: boolean = false;
  isAuthSubscription: Subscription;
  
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private userService: UserProvider) {
    platform.ready().then(
      () => {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    );
  }

  ngOnInit() {
    this.isAuthSubscription = this.userService.isAuth$.subscribe(
      (isAuth: boolean) => this.isAuth = isAuth
    );
    this.userService.emitIsAuth();
  }

  onLogout() {
    this.userService.logOut();
  }
  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
