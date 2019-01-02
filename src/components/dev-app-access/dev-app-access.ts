/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   dev-app-access.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/01 13:53:51 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/01 15:12:43 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { AccountPage } from '../../pages/account/account';

@Component({
  selector: 'dev-app-access',
  templateUrl: 'dev-app-access.html'
})
export class DevAppAccessComponent {
  constructor(private app: App,
              private navCtrl: NavController) {
  }

  isDevAccess(): boolean {
    return this.app.getActiveNavs()[0].getType() !== 'tab';
  }

  onGoToTabsPage(): void {
    if (this.isDevAccess) {
      this.app.getRootNav().setRoot(TabsPage);
    } else {
      this.navCtrl.setRoot(AccountPage);
    }
  }

}
