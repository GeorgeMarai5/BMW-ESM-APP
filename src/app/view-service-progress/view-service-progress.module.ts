import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceProgressPageRoutingModule } from './view-service-progress-routing.module';

import { ViewServiceProgressPage } from './view-service-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewServiceProgressPageRoutingModule
  ],
  declarations: [ViewServiceProgressPage]
})
export class ViewServiceProgressPageModule {}
