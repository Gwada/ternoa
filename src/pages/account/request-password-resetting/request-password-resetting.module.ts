/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   request-password-resetting.module.ts               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/30 02:11:21 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/30 02:11:22 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestPasswordResettingPage } from './request-password-resetting';

@NgModule({
  declarations: [
    RequestPasswordResettingPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestPasswordResettingPage),
  ],
})
export class RequestPasswordResettingPageModule {}
