import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelServicePageRoutingModule } from './cancel-service-routing.module';

import { CancelServicePage } from './cancel-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelServicePageRoutingModule
  ],
  declarations: [CancelServicePage]
})
export class CancelServicePageModule {}
