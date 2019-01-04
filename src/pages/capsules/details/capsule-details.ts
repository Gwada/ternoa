/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule-details.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 15:49:09 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/04 15:00:54 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../models/User';
import { Capsule } from '../../../models/Capsule.model';
import { UserProvider } from '../../../providers/user/user';
import { RequestProvider } from '../../../providers/request/request';
import { LoginPage } from '../../account/login/login';

@IonicPage()
@Component({
  selector: 'page-capsule-details',
  templateUrl: 'capsule-details.html',
})
export class CapsuleDetailsPage implements OnInit, OnDestroy {
  private user: User;
  private userSubscription: Subscription;
  private capsule = new Capsule();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserProvider,
              private reqService: RequestProvider,
              private app: App,
              private loading: LoadingController) {
  }

  ngOnInit(): void {
    this.setUser();
    this.setCapsule(this.navParams.get('capsule'));
  }
  
  setUser(): void {
    this.userSubscription = this.userService.user$.subscribe(
      (user: User) => this.user = user,
      (err) => {
        console.log(err);
        this.userService.logOut();
        this.app.getRootNav().setRoot(LoginPage);
      }
    );
    this.userService.emitUser();
  }

  setCapsule(uri: string): void {
    const loader = this.loading.create({content: 'Loading in progress...'});

    loader.present();
    this.reqService.get(uri.replace(/^\/?/, '') + '?order[updatedAt]=DESC').then(
      (capsule: Capsule) => {
        loader.dismiss();
        this.capsule = capsule;
        console.log(this.capsule);
      },
      (err) => {
        console.log(err);
        loader.dismiss();
      }
    );
  }

  getDate(date: string): string {
    return (new Date(date)).toDateString();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}