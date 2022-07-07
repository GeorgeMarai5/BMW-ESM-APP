import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPartDetailsPageRoutingModule } from './view-part-details-routing.module';

import { ViewPartDetailsPage } from './view-part-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPartDetailsPageRoutingModule
  ],
  declarations: [ViewPartDetailsPage]
})
export class ViewPartDetailsPageModule {}
