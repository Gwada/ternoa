/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tabs.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/19 16:25:50 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/20 16:39:17 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { Subscription } from 'rxjs/Subscription';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { CapsulesPage } from '../capsules/capsules'

@Injectable()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit, OnDestroy {
  tab1Root = HomePage;
  tab2Root: any;
  isAuth: boolean;
  accountSubscription: Subscription;
  accountPage = AccountPage;
  loginPage = LoginPage;

  constructor(private userService: UserProvider) {
  }

  ngOnInit(): void {
    this.accountSubscription = this.userService.isAuth$.subscribe(
      (isAuth: boolean) => {
        console.log(isAuth);
        this.isAuth = isAuth;
        this.tab2Root = isAuth ? this.accountPage : this.loginPage;
      }
    );
    this.userService.emitIsAuth();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }
}
