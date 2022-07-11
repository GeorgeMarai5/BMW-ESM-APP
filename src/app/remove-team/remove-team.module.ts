import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveTeamPageRoutingModule } from './remove-team-routing.module';

import { RemoveTeamPage } from './remove-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveTeamPageRoutingModule
  ],
  declarations: [RemoveTeamPage]
})
export class RemoveTeamPageModule {}
