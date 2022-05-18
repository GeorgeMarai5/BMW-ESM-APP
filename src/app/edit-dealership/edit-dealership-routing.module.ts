import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDealershipPage } from './edit-dealership.page';

const routes: Routes = [
  {
    path: '',
    component: EditDealershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDealershipPageRoutingModule {}
