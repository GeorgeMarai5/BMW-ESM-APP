import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardClientPageRoutingModule } from './dashboard-client-routing.module';

import { DashboardClientPage } from './dashboard-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardClientPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [DashboardClientPage]
})
export class DashboardClientPageModule {}
