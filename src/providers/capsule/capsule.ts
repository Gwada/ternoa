/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capsule.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 16:52:30 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/16 16:54:24 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Capsule } from '../../models/Capsule.model';
import { UserProvider } from '../user/user';
import { RequestProvider } from '../request/request';

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
  parentSubject = new Subject<Capsule>();
  childrenSubject = new Subject<Capsule>();
  completeProcessSubject = new Subject<any>();

  /**
   * SERVICE OBSERVABLES
   */
  step$ = this.stepSubject.asObservable();
  parent$ = this.parentSubject.asObservable();
  children$ = this.childrenSubject.asObservable();
  completeProcess$ = this.completeProcessSubject.asObservable();

  constructor(private userService: UserProvider,
              private requestService: RequestProvider) {}

  addRecipient(toFind: string): boolean {
    if (!this.userService.adjustCredits(-1)) {
      return ;
    }
    if (!this.capsule.recipients
    || this.capsule.recipients.indexOf(toFind) < 0) {
      if (this.capsule.recipients) {
        this.capsule.recipients.push(toFind);
      } else {
        this.capsule.recipients = [toFind];
      }
      this.emitToParent(this.capsule);
      this.emitToChildren();
      return true;
    }
    return false;
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
    if (this.capsule.recipients) {
      this.userService.adjustCredits(this.capsule.recipients.length);
    }
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

  emitCompletedCreationProcess(value: any): void {
    this.completeProcessSubject.next(value);
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

  post(body: Capsule): Promise<any> {
    return new Promise(
      (resolve, reject) => this.requestService.post('/capsules', body).then(
        (resp: Capsule) => resolve(resp),
        (err: any) => reject(err)
      )
    );
  }

  put(endPoint: string, body: Capsule): Promise<Capsule> {
    return new Promise(
      (resolve, reject) => this.requestService.put(endPoint, body).then(
        (resp: Capsule) => resolve(resp),
        (err: any) => reject(err)
      )
    );
  }

  delete(endPoint: string): Promise<any> {
    return new Promise(
      (resolve, reject) => this.requestService.delete(endPoint).then(
        (resp: any) => resolve(resp),
        (err: any) => reject(err)
      )
    );
  }

  get(endPoint: string): Promise<Capsule> {
    return new Promise(
      (resolve, reject) => this.requestService.get(endPoint).then(
        (resp: Capsule) => resolve(resp),
        (err: any) => reject(err)
      )
    );
  }

  getList(params: string): Promise<any> {
    return new Promise(
      (resolve, reject) => this.requestService.get(`/capsules?${params}`).then(
        (resp: Capsule[]) => resolve(resp),
        (err: any) => reject(err)
      )
    );
  }
}
