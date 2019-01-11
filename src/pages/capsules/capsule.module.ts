/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule.module.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 16:37:15 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/11 16:37:41 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCapsulePage } from './capsule';

@NgModule({
  declarations: [
    CreateCapsulePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCapsulePage),
  ],
})
export class CreateCapsulePageModule {}