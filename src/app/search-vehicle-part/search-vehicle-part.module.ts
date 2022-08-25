import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchVehiclePartPageRoutingModule } from './search-vehicle-part-routing.module';

import { SearchVehiclePartPage } from './search-vehicle-part.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchVehiclePartPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchVehiclePartPage]
})
export class SearchVehiclePartPageModule {}
