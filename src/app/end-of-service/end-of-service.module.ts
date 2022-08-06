import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndOfServicePageRoutingModule } from './end-of-service-routing.module';

import { EndOfServicePage } from './end-of-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndOfServicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EndOfServicePage]
})
export class EndOfServicePageModule {}
