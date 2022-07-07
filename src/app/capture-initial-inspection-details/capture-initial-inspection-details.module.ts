import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptureInitialInspectionDetailsPageRoutingModule } from './capture-initial-inspection-details-routing.module';

import { CaptureInitialInspectionDetailsPage } from './capture-initial-inspection-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaptureInitialInspectionDetailsPageRoutingModule
  ],
  declarations: [CaptureInitialInspectionDetailsPage]
})
export class CaptureInitialInspectionDetailsPageModule {}
