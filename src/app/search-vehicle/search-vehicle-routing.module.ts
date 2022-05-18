import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchVehiclePage } from './search-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: SearchVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchVehiclePageRoutingModule {}
