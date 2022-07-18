import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateServiceNotePageRoutingModule } from './create-service-note-routing.module';

import { CreateServiceNotePage } from './create-service-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateServiceNotePageRoutingModule
  ],
  declarations: [CreateServiceNotePage]
})
export class CreateServiceNotePageModule {}
