import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceInvoicePage } from './service-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceInvoicePageRoutingModule {}
