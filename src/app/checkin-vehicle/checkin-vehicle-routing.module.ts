import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckinVehiclePage } from './checkin-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: CheckinVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckinVehiclePageRoutingModule {}
