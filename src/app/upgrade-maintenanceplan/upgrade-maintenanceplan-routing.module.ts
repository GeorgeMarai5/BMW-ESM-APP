import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeMaintenanceplanPage } from './upgrade-maintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeMaintenanceplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeMaintenanceplanPageRoutingModule {}
