import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceNotePageRoutingModule } from './view-service-note-routing.module';

import { ViewServiceNotePage } from './view-service-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewServiceNotePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ViewServiceNotePage],
})
export class ViewServiceNotePageModule {}
