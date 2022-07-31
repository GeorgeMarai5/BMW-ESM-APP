import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTeamMemberPageRoutingModule } from './edit-team-member-routing.module';

import { EditTeamMemberPage } from './edit-team-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTeamMemberPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditTeamMemberPage]
})
export class EditTeamMemberPageModule {}
