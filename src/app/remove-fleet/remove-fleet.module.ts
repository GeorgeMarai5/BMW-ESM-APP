import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveFleetPageRoutingModule } from './remove-fleet-routing.module';

import { RemoveFleetPage } from './remove-fleet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveFleetPageRoutingModule
  ],
  declarations: [RemoveFleetPage]
})
export class RemoveFleetPageModule {}
