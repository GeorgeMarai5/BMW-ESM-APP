import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateQuotePageRoutingModule } from './update-quote-routing.module';

import { UpdateQuotePage } from './update-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateQuotePageRoutingModule
  ],
  declarations: [UpdateQuotePage]
})
export class UpdateQuotePageModule {}
