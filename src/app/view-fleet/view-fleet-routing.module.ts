import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFleetPage } from './view-fleet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFleetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFleetPageRoutingModule {}
