/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   received-capsules.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 11:05:50 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 11:05:51 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';

@Component({
  selector: 'received-capsules',
  templateUrl: 'received-capsules.html'
})
export class ReceivedCapsulesComponent {

  text: string;

  constructor() {
    console.log('Hello ReceivedCapsulesComponent Component');
    this.text = 'Hello World';
  }

}
