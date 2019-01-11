/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 16:52:30 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/11 17:06:37 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Capsule } from '../../models/Capsule.model';

@Injectable()
export class CapsuleProvider {
  private capsule: Capsule;
  step: number;
  sourceSubject = new Subject<any>();
  destSubject = new Subject<any>();
  source$ = this.sourceSubject.asObservable();
  dest$ = this.destSubject.asObservable();

  emitToDest(capsule: Capsule) {
    this.destSubject.next(capsule);
  }

  emitToSource(capsule: Capsule) {
    this.capsule = capsule;
    this.sourceSubject.next(this.capsule);
  }

}
