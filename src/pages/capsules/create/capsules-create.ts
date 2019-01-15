/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsules-create.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/14 10:37:22 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/15 11:13:21 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Capsule } from '../../../models/Capsule.model';
import { CapsuleProvider } from '../../../providers/capsule/capsule';
import { UserProvider } from '../../../providers/user/user';
import { User } from '../../../models/User';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'add-capsule',
  templateUrl: 'capsules-create.html',
})
export class CapsuleCreatePage implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;
  step: number;
  capsule = new Capsule();

  constructor(private capsuleService: CapsuleProvider,
              private userService: UserProvider) {
  }

  ngOnInit() {
    this.initUser();
    this.serviceSubscriber();
    this.capsuleService.initCapsuleCreationProcess(this.capsule);
    console.log(this.user);
  }

  initUser(): void {
    this.userSubscription = this.userService.user$.subscribe(
      (user: User) => this.user = user,
      (err: any) => console.log(err) 
    );
    this.userService.emitUser();
  }

  serviceSubscriber(): void {
    this.capsuleService.step$.subscribe(
      (step: number) => this.step = step,
      (err : any) => console.log(err)
    );
    this.capsuleService.parent$.subscribe(
      (capsule: Capsule) => {
        this.capsule = capsule;
        console.log(this.capsule);
      },
      (err: any) => console.log(err)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}