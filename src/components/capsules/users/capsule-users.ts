/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule-users.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/16 15:14:17 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/16 16:40:22 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/User';
import { ItemSliding } from 'ionic-angular';
import { CapsuleProvider } from '../../../providers/capsule/capsule';
import { UserProvider } from '../../../providers/user/user';
import { Subscription } from 'rxjs/Subscription';
import { Capsule } from '../../../models/Capsule.model';

@Component({
  selector: 'capsule-users',
  templateUrl: 'capsule-users.html'
})
export class CapsuleUsersComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() index: number;
  @Input() recipientsList: Capsule[];

  appUser: User;
  capsule: Capsule;
  userSubstiption: Subscription;

  constructor(private capsuleService: CapsuleProvider,
              private userService: UserProvider) {
  }

  ngOnInit(): void {
    this.initUser();
    this.initCapsule();
  }

  initUser(): void {
    this.userSubstiption = this.userService.user$.subscribe(
      (user: User) => this.appUser = user,
      (err: any) => console.log(err) 
    );
    this.userService.emitUser();
    console.log(this.appUser);
  }

  initCapsule(): void {
    this.capsuleService.children$.subscribe(
      capsule => this.capsule = capsule,
      err => console.log(err)
    );
    this.capsuleService.emitToChildren();
    console.log(this.capsule);
  }

  delete(item: ItemSliding, index: number): void {
    console.log(item);
    console.log(index);
    console.log(this.recipientsList);
    this.recipientsList.splice(index, 1);
    this.capsule.recipients.splice(index, 1);
    this.capsuleService.emitToParent(this.capsule);
    item.close();
    this.userService.adjustCredits(1);
  }

  ngOnDestroy() {
    this.userSubstiption.unsubscribe();
  }
}
