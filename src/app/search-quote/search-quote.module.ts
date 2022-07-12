import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchQuotePageRoutingModule } from './search-quote-routing.module';

import { SearchQuotePage } from './search-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchQuotePageRoutingModule
  ],
  declarations: [SearchQuotePage]
})
export class SearchQuotePageModule {}
