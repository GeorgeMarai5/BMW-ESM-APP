import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceInvoicePage } from './view-service-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceInvoicePageRoutingModule {}
