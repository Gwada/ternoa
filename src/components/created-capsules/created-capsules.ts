/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   created-capsules.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/02 11:06:07 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 11:06:08 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';

@Component({
  selector: 'created-capsules',
  templateUrl: 'created-capsules.html'
})
export class CreatedCapsulesComponent {

  text: string;

  constructor() {
    console.log('Hello CreatedCapsulesComponent Component');
    this.text = 'Hello World';
  }

}
