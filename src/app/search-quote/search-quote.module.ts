import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchQuotePageRoutingModule } from './search-quote-routing.module';

import { SearchQuotePage } from './search-quote.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SearchQuotePageRoutingModule
  ],
  declarations: [SearchQuotePage]
})
export class SearchQuotePageModule {}
