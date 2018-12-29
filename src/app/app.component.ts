/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.component.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:04:19 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/29 12:33:08 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
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
  @ViewChild('content') content: NavController;

  tabsPage: any = TabsPage;
  loginPage: any = LoginPage;
  registerPage: any = RegisterPage
  isAuth: boolean = false;
  isAuthSubscription: Subscription;
  
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
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
  
  onNavigate(page: any, data?: {})
  {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
