/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule-details.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 15:49:09 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 17:04:18 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { Subscription } from 'rxjs/Subscription';
import { UserProvider } from '../../providers/user/user';
import { Capsule } from '../../models/Capsule.model';
import { RequestProvider } from '../../providers/request/request';

@IonicPage()
@Component({
  selector: 'page-capsule-details',
  templateUrl: 'capsule-details.html',
})
export class CapsuleDetailsPage implements OnInit, OnDestroy {
  private user: User;
  private userSubscription: Subscription;
  private capsule: Capsule;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserProvider,
              private reqService: RequestProvider) {
  }

  ngOnInit(): void {
    this.setUser();
    this.setCapsule(this.navParams.get('capsule'));
  }
  
  setUser(): void {
    this.userSubscription = this.userService.user$.subscribe(
      (user: User) => this.user = user
    );
    this.userService.emitUser();
  }

  setCapsule(uri: string): void {
    this.reqService.get(uri.replace(/^\/?/, '')).then(
      (capsule: Capsule) => {
        this.capsule = capsule;
        console.log(this.capsule);
      },
      (err) => console.log(err)
    );
  }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad CapsuleDetailsPage');
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
