import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignVehiclePartPageRoutingModule } from './assign-vehicle-part-routing.module';

import { AssignVehiclePartPage } from './assign-vehicle-part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignVehiclePartPageRoutingModule
  ],
  declarations: [AssignVehiclePartPage]
})
export class AssignVehiclePartPageModule {}
