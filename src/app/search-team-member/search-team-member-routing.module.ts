import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchTeamMemberPage } from './search-team-member.page';

const routes: Routes = [
  {
    path: '',
    component: SearchTeamMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTeamMemberPageRoutingModule {}
