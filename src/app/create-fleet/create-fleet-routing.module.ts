import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFleetPage } from './create-fleet.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFleetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFleetPageRoutingModule {}
