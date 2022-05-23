import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignDealershipPageRoutingModule } from './assign-dealership-routing.module';

import { AssignDealershipPage } from './assign-dealership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignDealershipPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssignDealershipPage]
})
export class AssignDealershipPageModule {}
