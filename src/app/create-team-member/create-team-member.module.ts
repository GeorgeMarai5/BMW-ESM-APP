import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateTeamMemberPageRoutingModule } from './create-team-member-routing.module';

import { CreateTeamMemberPage } from './create-team-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTeamMemberPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateTeamMemberPage]
})
export class CreateTeamMemberPageModule {}
