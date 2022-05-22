import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMaintenanceplanPage } from './view-maintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMaintenanceplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMaintenanceplanPageRoutingModule {}
