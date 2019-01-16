/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-step-2.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/14 11:39:57 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/16 16:25:15 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CapsuleProvider } from '../../../../providers/capsule/capsule';
import { Capsule } from '../../../../models/Capsule.model';
import { UserProvider } from '../../../../providers/user/user';
import { User } from '../../../../models/User';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-create-step-2',
  templateUrl: 'create-step-2.html',
})
export class CreateStep_2Page implements OnInit {
  @Input() recipients: any;

  private capsule: Capsule;
  private recipientsList: User[] = [];
  private apiResponse: any;
  spinner: boolean = false;
  credits: number = 0;

  private recipientSubject = new Subject<User[]>();
  recipients$ = this.recipientSubject.asObservable();

  constructor(private viewCtrl: ViewController,
              private capsuleService: CapsuleProvider,
              private userService: UserProvider) {
  }

  ngOnInit(): void {
    this.initCapsule();
    this.initCredits();
  }

  initCredits(): void {
    this.userService.credits$.subscribe(
      (credits: number) => this.credits = credits,
      (err: any) => console.log(err)
    );
    this.userService.emitCredits();
  }

  initCapsule(): void {
    this.capsuleService.children$.subscribe(
      (capsule: Capsule) => this.capsule = capsule
    );
    this.capsuleService.emitToChildren();
  }

  cancelSearch($event: any): void {
    this.recipientSubject.next(null);
  }

  getItems(ev: any): void {
    const val: string = ev.target.value;
    this.apiResponse = null;

    this.recipientSubject.next(null);
    if (val && val.length > 4 && val.trim() !== '') {
      this.spinner = true;
      this.userService.findUserByTerm(val).then(
        (apiResponse: any) => this.itemsfilter(apiResponse),
        (err: any) => {
          console.log(err);
          this.spinner = false;
        }
      );
    }
  }

  itemsfilter(apiResponse: any): void {
    this.spinner = false;
    apiResponse['hydra:member'] = apiResponse['hydra:member'].filter(
      (user: User) => this.hasItem(user)
    );
    this.apiResponse = apiResponse;

    this.recipientSubject.next(apiResponse['hydra:member']);
  }

  hasItem(user: User): boolean {
    let ret = true;

    if (user['@id'] === this.userService.EndPoint) {
      return false;
    }
    this.recipientsList.forEach(
      (selected: User) => ret = ret && selected['@id'] !== user['@id']
    )
    return ret;
  }

  onAddRecipient(index: number): void {
    const toFind: string = this.apiResponse['hydra:member'][index]['@id'];

    if (this.capsuleService.addRecipient(toFind)) {
      this.recipientsList.push(this.apiResponse['hydra:member'][index]);
      this.apiResponse['hydra:member'].splice(index, 1);
    }
  }

  onCreateRecipient(): void {
    console.log('this function needs doc');
  }

  onPostCapsule(): void {
    this.capsule.owner = this.userService.EndPoint;

    delete(this.capsule['@id']);
    delete(this.capsule['@type']);
    this.capsuleService.emitToParent(this.capsule);
    this.capsuleService.emitCompletedCreationProcess(true);
  }

  onCancel(): void {
    this.capsuleService.cancelCapsuleCreationProcess();
    this.viewCtrl.dismiss();
  }

}
