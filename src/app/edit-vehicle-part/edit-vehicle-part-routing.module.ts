import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVehiclePartPage } from './edit-vehicle-part.page';

const routes: Routes = [
  {
    path: '',
    component: EditVehiclePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVehiclePartPageRoutingModule {}
