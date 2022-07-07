import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureInitialInspectionDetailsPage } from './capture-initial-inspection-details.page';

const routes: Routes = [
  {
    path: '',
    component: CaptureInitialInspectionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaptureInitialInspectionDetailsPageRoutingModule {}
