import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchServicePageRoutingModule } from './search-service-routing.module';

import { SearchServicePage } from './search-service.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchServicePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchServicePage]
})
export class SearchServicePageModule {}
