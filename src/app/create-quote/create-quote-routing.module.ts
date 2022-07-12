import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQuotePage } from './create-quote.page';

const routes: Routes = [
  {
    path: '',
    component: CreateQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuotePageRoutingModule {}
