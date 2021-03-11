import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainContentComponent } from './main-content/main-content.component';
import { CustomModule } from '../custom-module';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';


@NgModule({
  declarations: [MainContentComponent, ManageEmployeeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CustomModule
  ]
})
export class DashboardModule { }
