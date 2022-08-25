import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchServiceItemPageRoutingModule } from './search-service-item-routing.module';

import { SearchServiceItemPage } from './search-service-item.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    SearchServiceItemPageRoutingModule
  ],
  declarations: [SearchServiceItemPage]
})
export class SearchServiceItemPageModule {}
