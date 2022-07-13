import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTeamPage } from './view-team.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTeamPageRoutingModule {}
