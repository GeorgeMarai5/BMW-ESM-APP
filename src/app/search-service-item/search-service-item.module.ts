import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchServiceItemPageRoutingModule } from './search-service-item-routing.module';

import { SearchServiceItemPage } from './search-service-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchServiceItemPageRoutingModule
  ],
  declarations: [SearchServiceItemPage]
})
export class SearchServiceItemPageModule {}
