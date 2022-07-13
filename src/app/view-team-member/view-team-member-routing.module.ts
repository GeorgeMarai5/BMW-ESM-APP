import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTeamMemberPage } from './view-team-member.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTeamMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTeamMemberPageRoutingModule {}
