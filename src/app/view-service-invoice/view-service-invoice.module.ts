import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceInvoicePageRoutingModule } from './view-service-invoice-routing.module';

import { ViewServiceInvoicePage } from './view-service-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewServiceInvoicePageRoutingModule
  ],
  declarations: [ViewServiceInvoicePage]
})
export class ViewServiceInvoicePageModule {}
