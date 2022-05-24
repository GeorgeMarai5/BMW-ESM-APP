import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveFleetPage } from './remove-fleet.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveFleetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveFleetPageRoutingModule {}
