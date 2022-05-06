import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardEmployeePage } from './dashboard-employee.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardEmployeePageRoutingModule {}
