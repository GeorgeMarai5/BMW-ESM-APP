import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeMaintenancePlanPage } from './upgrade-maintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeMaintenancePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeMaintenanceplanPageRoutingModule {}
