import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignDealershipPage } from './assign-dealership.page';

const routes: Routes = [
  {
    path: '',
    component: AssignDealershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignDealershipPageRoutingModule {}
