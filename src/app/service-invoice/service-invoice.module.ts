import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceInvoicePageRoutingModule } from './service-invoice-routing.module';

import { ServiceInvoicePage } from './service-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceInvoicePageRoutingModule
  ],
  declarations: [ServiceInvoicePage]
})
export class ServiceInvoicePageModule {}
