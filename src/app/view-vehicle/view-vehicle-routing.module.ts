import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVehiclePage } from './view-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVehiclePageRoutingModule {}
