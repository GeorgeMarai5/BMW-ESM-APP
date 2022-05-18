import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDealershipPage } from './view-dealership.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDealershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDealershipPageRoutingModule {}
