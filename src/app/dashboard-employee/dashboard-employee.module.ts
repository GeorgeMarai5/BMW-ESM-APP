import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardEmployeePageRoutingModule } from './dashboard-employee-routing.module';
import { DashboardEmployeePage } from './dashboard-employee.page';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxGaugeModule,
    DashboardEmployeePageRoutingModule
  ],
  declarations: [DashboardEmployeePage]
})
export class DashboardEmployeePageModule {}
