/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 16:30:31 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/11 17:06:56 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Capsule } from '../../models/Capsule.model';
import { CapsuleProvider } from '../../providers/capsule/capsule';

@IonicPage()
@Component({
  selector: 'add-capsule',
  templateUrl: 'capsule.html',
})
export class CreateCapsulePage implements OnInit {
    step = 1;
    capsule = new Capsule();

    constructor(private capsuleService: CapsuleProvider) {
    }

    ngOnInit() {
        this.capsuleService.dest$.subscribe(
            (capsule: Capsule) => this.capsule = capsule
        );
    }

}
