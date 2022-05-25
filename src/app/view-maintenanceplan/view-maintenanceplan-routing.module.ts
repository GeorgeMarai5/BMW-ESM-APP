import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMaintenancePlanPage } from './view-maintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMaintenancePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMaintenanceplanPageRoutingModule {}
