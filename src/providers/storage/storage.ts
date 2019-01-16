/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   storage.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/16 10:38:42 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/16 10:38:43 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StorageProvider Provider');
  }

}
