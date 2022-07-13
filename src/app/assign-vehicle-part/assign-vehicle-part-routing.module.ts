import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignVehiclePartPage } from './assign-vehicle-part.page';

const routes: Routes = [
  {
    path: '',
    component: AssignVehiclePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignVehiclePartPageRoutingModule {}
