import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceNotePage } from './view-service-note.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceNotePageRoutingModule {}
