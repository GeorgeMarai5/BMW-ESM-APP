import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveTeamMemberPage } from './remove-team-member.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveTeamMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveTeamMemberPageRoutingModule {}
