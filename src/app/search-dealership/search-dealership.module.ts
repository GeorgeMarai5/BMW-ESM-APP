import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchDealershipPageRoutingModule } from './search-dealership-routing.module';

import { SearchDealershipPage } from './search-dealership.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchDealershipPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchDealershipPage]
})
export class SearchDealershipPageModule {}
