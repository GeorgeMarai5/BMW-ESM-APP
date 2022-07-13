import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchQuotePage } from './search-quote.page';

const routes: Routes = [
  {
    path: '',
    component: SearchQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchQuotePageRoutingModule {}
