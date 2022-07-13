import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTeamMemberPage } from './create-team-member.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTeamMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTeamMemberPageRoutingModule {}
