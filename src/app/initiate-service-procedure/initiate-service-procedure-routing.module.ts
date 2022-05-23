import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitiateServiceProcedurePage } from './initiate-service-procedure.page';

const routes: Routes = [
  {
    path: '',
    component: InitiateServiceProcedurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitiateServiceProcedurePageRoutingModule {}
