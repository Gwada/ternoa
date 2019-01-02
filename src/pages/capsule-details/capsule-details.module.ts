import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapsuleDetailsPage } from './capsule-details';

@NgModule({
  declarations: [
    CapsuleDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CapsuleDetailsPage),
  ],
})
export class CapsuleDetailsPageModule {}
