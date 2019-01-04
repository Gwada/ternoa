/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule-list.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/04 11:06:38 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/04 13:10:01 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, Input } from '@angular/core';
import { Capsule } from '../../../models/Capsule.model';
import { NavController } from 'ionic-angular';
import { CapsuleDetailsPage } from '../../../pages/capsules/details/capsule-details';

@Component({
  selector: 'capsule-list',
  templateUrl: 'capsule-list.html'
})
export class CapsuleListComponent {
  @Input() capsules: Capsule[];
  @Input() segment: string = '';

  constructor(private navCtrl: NavController) {
  }

  getDate(date: string): string {
    return (new Date(date)).toDateString();
  }

  onGoToCapsule(capsuleUri: string): void {
    this.navCtrl.push(CapsuleDetailsPage, {capsule: capsuleUri});
  }

}
