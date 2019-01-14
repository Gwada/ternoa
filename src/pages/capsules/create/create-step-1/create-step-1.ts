/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-step-1.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 15:14:50 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/14 12:23:06 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CapsuleProvider } from '../../../../providers/capsule/capsule';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Capsule } from '../../../../models/Capsule.model';

@IonicPage()
@Component({
  selector: 'page-create-step-1',
  templateUrl: 'create-step-1.html',
})
export class CreateStep_1Page implements OnInit {
  private capsuleNameForm: FormGroup;
  private capsule: Capsule;

  constructor(private viewCtrl: ViewController,
              private capsuleService: CapsuleProvider,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initCapsule();
    this.initForm();
  }

  initForm(): void {
    this.capsuleNameForm = this.formBuilder.group(
      {
        title: [this.capsule.title, Validators.required]
      }
    );
  }

  initCapsule(): void {
    this.capsuleService.children$.subscribe(
      (capsule: Capsule) => this.capsule = capsule,
      (err: any) => console.log(err)
    );
    this.capsuleService.emitToChildren();
  }

  onSubmit(): void {
    if (this.capsuleNameForm.valid) {
      this.capsuleService.emitToChildren();
      this.capsule.title = this.capsuleNameForm.get('title').value;
      this.capsuleService.emitToParent(this.capsule);
      this.onGoToNextStep();
    }
  }

  onCancel(): void {
    this.capsuleService.cancelCapsuleCreationProcess();
    this.viewCtrl.dismiss();
  }

  onGoToNextStep(): void {
    this.capsuleService.goToNextStep();
  }

}
