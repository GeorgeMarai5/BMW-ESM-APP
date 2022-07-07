import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPartDetailsPage } from './view-part-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPartDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPartDetailsPageRoutingModule {}
