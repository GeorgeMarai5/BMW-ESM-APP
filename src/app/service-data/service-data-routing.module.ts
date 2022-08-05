import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceDataPage } from './service-data.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceDataPageRoutingModule {}
