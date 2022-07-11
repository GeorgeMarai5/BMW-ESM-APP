import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveTeamMemberPageRoutingModule } from './remove-team-member-routing.module';

import { RemoveTeamMemberPage } from './remove-team-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveTeamMemberPageRoutingModule
  ],
  declarations: [RemoveTeamMemberPage]
})
export class RemoveTeamMemberPageModule {}
