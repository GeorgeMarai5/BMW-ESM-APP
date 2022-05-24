import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFleetPageRoutingModule } from './search-fleet-routing.module';

import { SearchFleetPage } from './search-fleet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFleetPageRoutingModule
  ],
  declarations: [SearchFleetPage]
})
export class SearchFleetPageModule {}
