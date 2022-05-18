import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchDealershipPageRoutingModule } from './search-dealership-routing.module';

import { SearchDealershipPage } from './search-dealership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchDealershipPageRoutingModule
  ],
  declarations: [SearchDealershipPage]
})
export class SearchDealershipPageModule {}
