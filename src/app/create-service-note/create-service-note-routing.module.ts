import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateServiceNotePage } from './create-service-note.page';

const routes: Routes = [
  {
    path: '',
    component: CreateServiceNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateServiceNotePageRoutingModule {}
