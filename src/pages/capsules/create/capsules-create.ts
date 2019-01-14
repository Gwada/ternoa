/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsules-create.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/14 10:37:22 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/14 17:24:23 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Capsule } from '../../../models/Capsule.model';
import { CapsuleProvider } from '../../../providers/capsule/capsule';

@IonicPage()
@Component({
  selector: 'add-capsule',
  templateUrl: 'capsules-create.html',
})
export class CapsuleCreatePage implements OnInit {
  step: number;
  capsule = new Capsule();

  constructor(private capsuleService: CapsuleProvider) {
  }

  ngOnInit() {
    this.serviceSubscriber();
    this.capsuleService.initCapsuleCreationProcess(this.capsule);
    console.log(this.capsule);
  }

  serviceSubscriber(): void {
    this.capsuleService.step$.subscribe(
      (step: number) => this.step = step,
      (err : any) => console.log(err)
    );
    this.capsuleService.parent$.subscribe(
      (capsule: Capsule) => this.capsule = capsule,
      (err: any) => console.log(err)
    );
  }

}