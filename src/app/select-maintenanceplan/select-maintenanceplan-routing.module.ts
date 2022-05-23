import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectMaintenanceplanPage } from './select-maintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMaintenanceplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectMaintenanceplanPageRoutingModule {}
