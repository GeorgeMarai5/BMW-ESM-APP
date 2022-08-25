import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceInvoicePageRoutingModule } from './view-service-invoice-routing.module';

import { ViewServiceInvoicePage } from './view-service-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewServiceInvoicePageRoutingModule
  ],
  declarations: [ViewServiceInvoicePage]
})
export class ViewServiceInvoicePageModule {}
