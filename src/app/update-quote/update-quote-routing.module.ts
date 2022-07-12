import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateQuotePage } from './update-quote.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateQuotePageRoutingModule {}
