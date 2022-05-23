import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create/account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'update/client',
    loadChildren: () => import('./update-client/update-client.module').then( m => m.UpdateClientPageModule)
  },
  {
    path: 'update/password',
    loadChildren: () => import('./update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
  {
    path: 'search/account/employee',
    loadChildren: () => import('./searchemployeeaccount/searchemployeeaccount.module').then( m => m.SearchemployeeaccountPageModule)
  },
  {
    path: 'password/reset',
    loadChildren: () => import('./password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'dashboard/client',
    loadChildren: () => import('./dashboard-client/dashboard-client.module').then( m => m.DashboardClientPageModule)
  },
  {
    path: 'search/account/client',
    loadChildren: () => import('./searchclientaccount/searchclientaccount.module').then( m => m.SearchclientaccountPageModule)
  },
  {
    path: 'dashboard/employee',
    loadChildren: () => import('./dashboard-employee/dashboard-employee.module').then( m => m.DashboardEmployeePageModule)
  },
  {
    path: 'view/client',
    loadChildren: () => import('./view-client-account/view-client-account.module').then( m => m.ViewClientAccountPageModule)
  },
  {
    path: 'view-employee-account',
    loadChildren: () => import('./view-employee-account/view-employee-account.module').then( m => m.ViewEmployeeAccountPageModule)
  },
  {
    path: 'update-employee',
    loadChildren: () => import('./update-employee/update-employee.module').then( m => m.UpdateEmployeePageModule)
  },
  {
    path: 'add-vehicle',
    loadChildren: () => import('./add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
  },
  {
    path: 'edit-vehicle',
    loadChildren: () => import('./edit-vehicle/edit-vehicle.module').then( m => m.EditVehiclePageModule)
  },
  {
    path: 'search-vehicle',
    loadChildren: () => import('./search-vehicle/search-vehicle.module').then( m => m.SearchVehiclePageModule)
  },
  {
    path: 'view-vehicle',
    loadChildren: () => import('./view-vehicle/view-vehicle.module').then( m => m.ViewVehiclePageModule)
  },
  {
    path: 'assign-dealership',
    loadChildren: () => import('./assign-dealership/assign-dealership.module').then( m => m.AssignDealershipPageModule)
  },
  {
    path: 'edit-dealership',
    loadChildren: () => import('./edit-dealership/edit-dealership.module').then( m => m.EditDealershipPageModule)
  },
  {
    path: 'search-dealership',
    loadChildren: () => import('./search-dealership/search-dealership.module').then( m => m.SearchDealershipPageModule)
  },
  {
    path: 'view-dealership',
    loadChildren: () => import('./view-dealership/view-dealership.module').then( m => m.ViewDealershipPageModule)
  },
  {
    path: 'searchmaintenanceplan',
    loadChildren: () => import('./searchmaintenanceplan/searchmaintenanceplan.module').then( m => m.SearchmaintenanceplanPageModule)
  },
  {
    path: 'select-maintenanceplan',
    loadChildren: () => import('./select-maintenanceplan/select-maintenanceplan.module').then( m => m.SelectMaintenanceplanPageModule)
  },
  {
    path: 'upgrade-maintenanceplan',
    loadChildren: () => import('./upgrade-maintenanceplan/upgrade-maintenanceplan.module').then( m => m.UpgradeMaintenanceplanPageModule)
  },
  {
    path: 'view-maintenanceplan',
    loadChildren: () => import('./view-maintenanceplan/view-maintenanceplan.module').then( m => m.ViewMaintenanceplanPageModule)
  },
  {
    path: 'initiate-service-procedure',
    loadChildren: () => import('./initiate-service-procedure/initiate-service-procedure.module').then( m => m.InitiateServiceProcedurePageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
