/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 16:52:30 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/14 17:24:28 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Capsule } from '../../models/Capsule.model';

@Injectable()
export class CapsuleProvider {
  /**
   * SERVICE VALUES
   */
  private capsule: Capsule;
  private step: number;

  /**
   * SERVICE SUBJECTS
   */
  stepSubject = new Subject<number>();
  parentSubject = new Subject<any>();
  childrenSubject = new Subject<any>();

  /**
   * SERVICE OBSERVABLES
   */
  step$ = this.stepSubject.asObservable();
  parent$ = this.parentSubject.asObservable();
  children$ = this.childrenSubject.asObservable();

  addRecipient(toFind: string): void {
    if (!this.capsule.recipients
    || this.capsule.recipients.indexOf(toFind) < 0) {
      if (this.capsule.recipients) {
        this.capsule.recipients.push(toFind);
      } else {
        this.capsule.recipients = [toFind];
      }
      console.log(this.capsule);
      this.emitToParent(this.capsule);
      this.emitToChildren();
    }
  }

  /**
   * initialization of the capsule creation process
   */
  initCapsuleCreationProcess(capsule: Capsule): void {
    this.step = 1;
    this.capsule = capsule;
    this.emitStep();
    this.emitToParent(this.capsule);
    this.emitToChildren();
  }

  cancelCapsuleCreationProcess(): void {
    delete(this.step);
    delete(this.capsule);
    this.emitStep();
    this.emitToParent(this.capsule);
    this.emitToChildren();
  }

  /**
   * CHILDREN EMITER
   * 
   * @param capsule 
   */
  emitToChildren() {
    this.childrenSubject.next(this.capsule);
  }

  /**
   * PARENT EMITER
   * 
   * @param capsule 
   */
  emitToParent(capsule: Capsule) {
    this.capsule = capsule;
    this.parentSubject.next(this.capsule);
    this.emitToChildren();
  }

  /**
   * STEP ACTIONS EMITER
   */
  emitStep(): void {
    this.stepSubject.next(this.step);
  }

  goToPreviousStep() {
    if (this.step > 1) {
      this.stepSubject.next(--this.step);
    }
  }

  goToNextStep() {
    this.stepSubject.next(++this.step);
  }

  get title(): string {
    return this.capsule.title;
  }

}
