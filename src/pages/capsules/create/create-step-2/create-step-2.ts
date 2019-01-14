/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-step-2.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/14 11:39:57 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/14 17:23:59 by dlavaury         ###   ########.fr       */
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
  private apiResponse: any;
  private recipientSubject = new Subject<User[]>();
  private recipients$ = this.recipientSubject.asObservable();

  constructor(private viewCtrl: ViewController,
              private capsuleService: CapsuleProvider,
              private userService: UserProvider) {
  }

  ngOnInit(): void {
    console.log(this.recipients);
    this.initCapsule();
  }

  initCapsule() {
    this.capsuleService.children$.subscribe(
      (capsule: Capsule) => this.capsule = capsule
    );
    this.capsuleService.emitToChildren();
    console.log(this.capsule);
  }

  getItems(ev: any): void {
    const val: string = ev.target.value;

    if (val.length > 4) {
      console.log('go api req');
      this.userService.findUserByTerm(val).then(
        (apiResponse: any) => {
          console.log(apiResponse);
          this.apiResponse = apiResponse;
          this.recipientSubject.next(apiResponse['hydra:member']);
        },
        (err: any) => console.log(err)
      );
    }
  }

  onAddRecipient(index: number): void {
    const toFind: string = this.apiResponse['hydra:member'][index]['@id'];

    this.capsuleService.addRecipient(toFind);
  }
  
  onCreateRecipient() {
    console.log('this function needs doc');
  }

  onCancel(): void {
    this.capsuleService.cancelCapsuleCreationProcess();
    this.viewCtrl.dismiss();
  }

}
