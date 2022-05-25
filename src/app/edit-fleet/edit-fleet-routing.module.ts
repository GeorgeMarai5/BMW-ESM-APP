import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFleetPage } from './edit-fleet.page';

const routes: Routes = [
  {
    path: '',
    component: EditFleetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFleetPageRoutingModule {}
