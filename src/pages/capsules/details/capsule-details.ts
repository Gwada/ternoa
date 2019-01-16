/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule-details.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 15:49:09 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/16 10:54:01 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../models/User';
import { Capsule } from '../../../models/Capsule.model';
import { UserProvider } from '../../../providers/user/user';
import { LoginPage } from '../../account/login/login';
import { Message } from '../../../models/Message.model';
import { CapsuleProvider } from '../../../providers/capsule/capsule';

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
              private app: App,
              private loading: LoadingController,
              private capsuleService: CapsuleProvider) {
  }

  ngOnInit(): void {
    this.setUser();
    this.setCapsule(this.navParams.get('capsule'));
  }
  
  setUser(): void {
    this.userSubscription = this.userService.user$.subscribe(
      (user: User) => this.user = user,
      (err) => {
        this.userService.logOut();
        this.app.getRootNav().setRoot(LoginPage);
      }
    );
    this.userService.emitUser();
  }

  setCapsule(uri: string): void {
    const loader = this.loading.create({content: 'Loading in progress...'});

    loader.present();
    this.capsuleService.get(uri).then(
      (capsule: Capsule) => {
        loader.dismiss();
        this.capsule = capsule;
        this.capsule.messages.sort(
          (a: Message, b: Message) => this.sort(a, b)
        );
      },
      (err) => {
        console.log(err);
        loader.dismiss();
      }
    );
  }

  sort(a: Message, b: Message): number {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }

  getDate(date: string): string {
    return (new Date(date)).toDateString();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
