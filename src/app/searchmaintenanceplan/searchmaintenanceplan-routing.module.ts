import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMaintenancePlanPage } from './searchmaintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMaintenancePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchmaintenanceplanPageRoutingModule {}
