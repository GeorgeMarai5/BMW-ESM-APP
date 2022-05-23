import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitiateServiceProcedurePageRoutingModule } from './initiate-service-procedure-routing.module';

import { InitiateServiceProcedurePage } from './initiate-service-procedure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitiateServiceProcedurePageRoutingModule
  ],
  declarations: [InitiateServiceProcedurePage]
})
export class InitiateServiceProcedurePageModule {}
