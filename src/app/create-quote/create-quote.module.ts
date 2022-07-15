import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuotePageRoutingModule } from './create-quote-routing.module';

import { CreateQuotePage } from './create-quote.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreateQuotePageRoutingModule
  ],
  declarations: [CreateQuotePage]
})
export class CreateQuotePageModule {}
