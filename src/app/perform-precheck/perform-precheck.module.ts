import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformPrecheckPageRoutingModule } from './perform-precheck-routing.module';

import { PerformPrecheckPage } from './perform-precheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerformPrecheckPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PerformPrecheckPage]
})
export class PerformPrecheckPageModule {}
