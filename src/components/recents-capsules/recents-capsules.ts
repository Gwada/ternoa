/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   recents-capsules.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 11:05:17 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 17:04:23 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/User';
import { Subscription } from 'rxjs/Subscription';
import { NavController } from 'ionic-angular';
import { CapsuleDetailsPage } from '../../pages/capsule-details/capsule-details';
import { Capsule } from '../../models/Capsule.model';

@Component({
  selector: 'recents-capsules',
  templateUrl: 'recents-capsules.html'
})
export class RecentsCapsulesComponent implements OnInit, OnDestroy {
  private user: User;
  userSuscription: Subscription;

  constructor(private userService: UserProvider,
              private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.userSuscription = this.userService.user$.subscribe(
      (user: User) => {
        this.user = user;
        this.user.capsules.sort((a: Capsule, b: Capsule) => this.sort(a, b));
      }
    );
    this.userService.emitUser();
  }

  onGoToCapsule(capsuleUri: string): void {
    this.navCtrl.push(CapsuleDetailsPage, {capsule: capsuleUri});
  }

  getDate(date: string): string {
    return (new Date(date)).toDateString();
  }

  sort(a: Capsule, b: Capsule): number {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }

}
