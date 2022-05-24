import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFleetPageRoutingModule } from './edit-fleet-routing.module';

import { EditFleetPage } from './edit-fleet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFleetPageRoutingModule
  ],
  declarations: [EditFleetPage]
})
export class EditFleetPageModule {}
