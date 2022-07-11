import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveTeamPage } from './remove-team.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveTeamPageRoutingModule {}
