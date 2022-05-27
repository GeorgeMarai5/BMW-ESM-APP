import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDealershipPageRoutingModule } from './view-dealership-routing.module';

import { ViewDealershipPage } from './view-dealership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDealershipPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewDealershipPage]
})
export class ViewDealershipPageModule {}
