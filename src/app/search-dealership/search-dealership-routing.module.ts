import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDealershipPage } from './search-dealership.page';

const routes: Routes = [
  {
    path: '',
    component: SearchDealershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDealershipPageRoutingModule {}
