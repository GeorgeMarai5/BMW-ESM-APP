import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFleetPageRoutingModule } from './view-fleet-routing.module';

import { ViewFleetPage } from './view-fleet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFleetPageRoutingModule
  ],
  declarations: [ViewFleetPage]
})
export class ViewFleetPageModule {}