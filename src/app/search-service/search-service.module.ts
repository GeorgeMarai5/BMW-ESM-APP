import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchServicePageRoutingModule } from './search-service-routing.module';

import { SearchServicePage } from './search-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchServicePageRoutingModule
  ],
  declarations: [SearchServicePage]
})
export class SearchServicePageModule {}
