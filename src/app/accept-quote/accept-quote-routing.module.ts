import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptQuotePage } from './accept-quote.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptQuotePageRoutingModule {}
