import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDataPageRoutingModule } from './service-data-routing.module';

import { ServiceDataPage } from './service-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceDataPageRoutingModule ,
    ReactiveFormsModule
  ],
  declarations: [ServiceDataPage]
})
export class ServiceDataPageModule {}
