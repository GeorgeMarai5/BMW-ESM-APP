import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateFleetPageRoutingModule } from './create-fleet-routing.module';

import { CreateFleetPage } from './create-fleet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFleetPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [CreateFleetPage]
})
export class CreateFleetPageModule {}
