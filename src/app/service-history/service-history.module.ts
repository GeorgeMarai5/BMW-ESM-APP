import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceHistoryPageRoutingModule } from './service-history-routing.module';

import { ServiceHistoryPage } from './service-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceHistoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiceHistoryPage]
})
export class ServiceHistoryPageModule {}
