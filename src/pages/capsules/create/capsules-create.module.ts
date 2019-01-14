import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapsuleCreatePage } from './capsules-create';

@NgModule({
  declarations: [
    CapsuleCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CapsuleCreatePage),
  ],
})
export class CapsulesCreatePageModule {}
