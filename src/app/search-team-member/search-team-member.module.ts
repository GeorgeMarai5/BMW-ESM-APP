import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchTeamMemberPageRoutingModule } from './search-team-member-routing.module';

import { SearchTeamMemberPage } from './search-team-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchTeamMemberPageRoutingModule
  ],
  declarations: [SearchTeamMemberPage]
})
export class SearchTeamMemberPageModule {}
