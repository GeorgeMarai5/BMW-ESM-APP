import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptQuotePageRoutingModule } from './accept-quote-routing.module';

import { AcceptQuotePage } from './accept-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptQuotePageRoutingModule
  ],
  declarations: [AcceptQuotePage]
})
export class AcceptQuotePageModule {}
