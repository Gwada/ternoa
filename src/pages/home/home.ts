/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   home.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 16:57:42 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/17 16:39:55 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/User';
import { Subscription } from 'rxjs/Subscription';
import { UserProvider } from '../../providers/user/user';
import { Capsule } from '../../models/Capsule.model';
import { LoginPage } from '../account/login/login';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  private user: User;
  userSubscription: Subscription;
  segment = 'draft';
  credits: number;

  constructor(private userService: UserProvider,
              private app: App) {
  }
  
  ngOnInit(): void {
    this.initUser();
    this.initCredits();
  }

  initCredits(): void {
    this.userService.credits$.subscribe(
      (credits: number) => this.credits = credits,
      (err: any) => console.log(err)
    );
    this.userService.emitCredits();
  }
  initUser(): void {
    this.userSubscription = this.userService.user$.subscribe(
      (user: User) => this.setUser(user),
      (err) => {
        console.log(err);
        this.userService.logOut();
        this.app.getRootNav().setRoot(LoginPage);
      }
    );
    this.userService.emitUser();
  }

  setUser(user: User): void {
    if ((this.user = user)) {
      this.user.capsules.sort(
        (a: Capsule, b: Capsule) => this.sort(a, b)
      );
      this.user.intentedCapsules.sort(
        (a: Capsule, b: Capsule) => this.sort(a, b)
      );
    }
  }

  sort(a: Capsule, b: Capsule): number {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
