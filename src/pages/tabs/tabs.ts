/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tabs.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:25:50 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/11 16:54:14 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { Subscription } from 'rxjs/Subscription';
import { LoginPage } from '../account/login/login';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { CreateCapsulePage } from '../capsules/capsule';

@Injectable()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit, OnDestroy {
  homePage = HomePage;
  capsulePage: any;
  account: any;
  isAuth: boolean;
  userSubscription: Subscription;
  accountPage = AccountPage;
  loginPage = LoginPage;

  constructor(private userService: UserProvider,
              private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.isAuth$.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
        this.account = isAuth ? this.accountPage : this.loginPage;
      }
    );
    this.userService.emitIsAuth();
    this.capsulePage = this.modalCtrl.create(CreateCapsulePage);
  }

  onCreateCapsule() {
    this.capsulePage.present();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
