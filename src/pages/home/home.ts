/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   home.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 16:57:42 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 15:45:58 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  capsules: string;

  constructor() {
    this.capsules = 'capsules';
  }
}
