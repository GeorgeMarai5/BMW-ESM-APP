import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchmaintenanceplanPage } from './searchmaintenanceplan.page';

const routes: Routes = [
  {
    path: '',
    component: SearchmaintenanceplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchmaintenanceplanPageRoutingModule {}
