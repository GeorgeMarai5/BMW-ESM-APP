import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardClientPage } from './dashboard-client.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardClientPageRoutingModule {}
