import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVehiclePartPage } from './view-vehicle-part.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVehiclePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVehiclePartPageRoutingModule {}
