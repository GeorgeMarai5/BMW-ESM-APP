import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTeamPageRoutingModule } from './view-team-routing.module';

import { ViewTeamPage } from './view-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTeamPageRoutingModule
  ],
  declarations: [ViewTeamPage]
})
export class ViewTeamPageModule {}
