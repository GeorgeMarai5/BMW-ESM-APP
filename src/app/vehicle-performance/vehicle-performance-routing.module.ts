import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclePerformancePage } from './vehicle-performance.page';

const routes: Routes = [
  {
    path: '',
    component: VehiclePerformancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclePerformancePageRoutingModule {}
