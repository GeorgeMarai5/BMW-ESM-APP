import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchVehiclePartPage } from './search-vehicle-part.page';

const routes: Routes = [
  {
    path: '',
    component: SearchVehiclePartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchVehiclePartPageRoutingModule {}
