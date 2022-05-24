import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFleetPageRoutingModule } from './create-fleet-routing.module';

import { CreateFleetPage } from './create-fleet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFleetPageRoutingModule
  ],
  declarations: [CreateFleetPage]
})
export class CreateFleetPageModule {}
