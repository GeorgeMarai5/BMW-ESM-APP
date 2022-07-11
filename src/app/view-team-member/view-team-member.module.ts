import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTeamMemberPageRoutingModule } from './view-team-member-routing.module';

import { ViewTeamMemberPage } from './view-team-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTeamMemberPageRoutingModule
  ],
  declarations: [ViewTeamMemberPage]
})
export class ViewTeamMemberPageModule {}
