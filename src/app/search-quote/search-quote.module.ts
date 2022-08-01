import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchQuotePageRoutingModule } from './search-quote-routing.module';

import { SearchQuotePage } from './search-quote.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SearchQuotePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchQuotePage]
})
export class SearchQuotePageModule {}
