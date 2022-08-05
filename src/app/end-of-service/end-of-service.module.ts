import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndOfServicePageRoutingModule } from './end-of-service-routing.module';

import { EndOfServicePage } from './end-of-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndOfServicePageRoutingModule
  ],
  declarations: [EndOfServicePage]
})
export class EndOfServicePageModule {}
