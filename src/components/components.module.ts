/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   components.module.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 11:05:27 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 11:05:28 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NgModule } from '@angular/core';
import { DevAppAccessComponent } from './dev-app-access/dev-app-access';
import { RecentsCapsulesComponent } from './recents-capsules/recents-capsules';
import { CreatedCapsulesComponent } from './created-capsules/created-capsules';
import { ReceivedCapsulesComponent } from './received-capsules/received-capsules';
@NgModule({
	declarations: [DevAppAccessComponent,
    RecentsCapsulesComponent,
    CreatedCapsulesComponent,
    ReceivedCapsulesComponent],
	imports: [],
	exports: [DevAppAccessComponent,
    RecentsCapsulesComponent,
    CreatedCapsulesComponent,
    ReceivedCapsulesComponent]
})
export class ComponentsModule {}
