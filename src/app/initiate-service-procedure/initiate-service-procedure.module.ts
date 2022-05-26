import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitiateServiceProcedurePageRoutingModule } from './initiate-service-procedure-routing.module';

import { InitiateServiceProcedurePage } from './initiate-service-procedure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InitiateServiceProcedurePageRoutingModule
  ],
  declarations: [InitiateServiceProcedurePage]
})
export class InitiateServiceProcedurePageModule {}
