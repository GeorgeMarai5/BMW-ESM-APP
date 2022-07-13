import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTeamMemberPage } from './edit-team-member.page';

const routes: Routes = [
  {
    path: '',
    component: EditTeamMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTeamMemberPageRoutingModule {}
