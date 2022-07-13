import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DataResolverService } from '../resolver/data-resolver.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'create/account',
        loadChildren: () => import('../create-account/create-account.module').then(m => m.CreateAccountPageModule)
      },
      {
        path: 'update/client',
        loadChildren: () => import('../update-client/update-client.module').then( m => m.UpdateClientPageModule)
      },
      {
        path: 'update/client/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../update-client/update-client.module').then( m => m.UpdateClientPageModule)
      },
      {
        path: 'update/password',
        loadChildren: () => import('../update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
      },
      {
        path: 'dashboard/client',
        loadChildren: () => import('../dashboard-client/dashboard-client.module').then( m => m.DashboardClientPageModule)
      },
      {
        path: 'dashboard/client/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../dashboard-client/dashboard-client.module').then( m => m.DashboardClientPageModule)
      },
      {
        path: 'dashboard/employee',
        loadChildren: () => import('../dashboard-employee/dashboard-employee.module').then( m => m.DashboardEmployeePageModule)
      },
      {
        path: 'dashboard/employee/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../dashboard-employee/dashboard-employee.module').then( m => m.DashboardEmployeePageModule)
      },
      {
        path: 'search/account/employee',
        loadChildren: () => import('../searchemployeeaccount/searchemployeeaccount.module').then( m => m.SearchemployeeaccountPageModule)
      },
      {
        path: 'password/reset',
        loadChildren: () => import('../password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('../verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
      },
      {
        path: 'search/account/client',
        loadChildren: () => import('../searchclientaccount/searchclientaccount.module').then( m => m.SearchclientaccountPageModule)
      },
      {
        path: 'view/client',
        loadChildren: () => import('../view-client-account/view-client-account.module').then( m => m.ViewClientAccountPageModule)
      },
      {
        path: 'view/client/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-client-account/view-client-account.module').then( m => m.ViewClientAccountPageModule)
      },
      {
        path: 'view/employee-account',
        loadChildren: () => import('../view-employee-account/view-employee-account.module').then( m => m.ViewEmployeeAccountPageModule)
      },
      {
        path: 'view/employee/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-employee-account/view-employee-account.module').then( m => m.ViewEmployeeAccountPageModule)
      },
      {
        path: 'update/employee',
        loadChildren: () => import('../update-employee/update-employee.module').then( m => m.UpdateEmployeePageModule)
      },
      {
        path: 'update/employee/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../update-employee/update-employee.module').then( m => m.UpdateEmployeePageModule)
      },
      
      {
        path: 'add/vehicle',
        loadChildren: () => import('../add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
      },
      {
        path: 'search/vehicle',
        loadChildren: () => import('../search-vehicle/search-vehicle.module').then( m => m.SearchVehiclePageModule)
      },
      {
        path: 'view/vehicle',
        loadChildren: () => import('../view-vehicle/view-vehicle.module').then( m => m.ViewVehiclePageModule)
      },
      {
        path: 'view/vehicle/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-vehicle/view-vehicle.module').then( m => m.ViewVehiclePageModule)
      },
      {
        path: 'assign/dealership',
        loadChildren: () => import('../assign-dealership/assign-dealership.module').then( m => m.AssignDealershipPageModule)
      },
      {
        path: 'assign/dealership/:id',
        loadChildren: () => import('../assign-dealership/assign-dealership.module').then( m => m.AssignDealershipPageModule)
      },
      {
        path: 'edit/dealership',
        loadChildren: () => import('../edit-dealership/edit-dealership.module').then( m => m.EditDealershipPageModule)
      },
      {
        path: 'edit/dealership/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../edit-dealership/edit-dealership.module').then( m => m.EditDealershipPageModule)
      },
      {
        path: 'search/dealership',
        loadChildren: () => import('../search-dealership/search-dealership.module').then( m => m.SearchDealershipPageModule)
      },
      {
        path: 'view/dealership',
        loadChildren: () => import('../view-dealership/view-dealership.module').then( m => m.ViewDealershipPageModule)
      },
      {
        path: 'view/dealership/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-dealership/view-dealership.module').then( m => m.ViewDealershipPageModule)
      },
      {
        path: 'search/maintenanceplan',
        loadChildren: () => import('../searchmaintenanceplan/searchmaintenanceplan.module').then( m => m.SearchmaintenanceplanPageModule)
      },
      {
        path: 'select-maintenanceplan',
        loadChildren: () => import('../select-maintenanceplan/select-maintenanceplan.module').then( m => m.SelectMaintenanceplanPageModule)
      },
      {
        path: 'upgrade/maintenanceplan',
        loadChildren: () => import('../upgrade-maintenanceplan/upgrade-maintenanceplan.module').then( m => m.UpgradeMaintenanceplanPageModule)
      },
      {
        path: 'upgrade/maintenanceplan/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../upgrade-maintenanceplan/upgrade-maintenanceplan.module').then( m => m.UpgradeMaintenanceplanPageModule)
      },
      {
        path: 'view/maintenanceplan',
        loadChildren: () => import('../view-maintenanceplan/view-maintenanceplan.module').then( m => m.ViewMaintenanceplanPageModule)
      },
      {
        path: 'view/maintenanceplan/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-maintenanceplan/view-maintenanceplan.module').then( m => m.ViewMaintenanceplanPageModule)
      },
      {
        path: 'initiate-service-procedure',
        loadChildren: () => import('../initiate-service-procedure/initiate-service-procedure.module').then( m => m.InitiateServiceProcedurePageModule)
      },
      {
        path: 'create/service',
        loadChildren: () => import('../create-service/create-service.module').then( m => m.CreateServicePageModule)
      },
      {
        path: 'update/service',
        loadChildren: () => import('../update-service/update-service.module').then( m => m.UpdateServicePageModule)
      },
      {
        path: 'update/service/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../update-service/update-service.module').then( m => m.UpdateServicePageModule)
      },
      {
        path: 'cancel-service',
        loadChildren: () => import('../cancel-service/cancel-service.module').then( m => m.CancelServicePageModule)
      },
      {
        path: 'search/service',
        loadChildren: () => import('../search-service/search-service.module').then( m => m.SearchServicePageModule)
      },
      {
        path: 'view/service',
        loadChildren: () => import('../view-service/view-service.module').then( m => m.ViewServicePageModule)
      },
      {
        path: 'view/service/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-service/view-service.module').then( m => m.ViewServicePageModule)
      },
      {
        path: 'create/fleet',
        loadChildren: () => import('../create-fleet/create-fleet.module').then( m => m.CreateFleetPageModule)
      },
      {
        path: 'search/fleet',
        loadChildren: () => import('../search-fleet/search-fleet.module').then( m => m.SearchFleetPageModule)
      },
      {
        path: 'edit/fleet',
        loadChildren: () => import('../edit-fleet/edit-fleet.module').then( m => m.EditFleetPageModule)
      },
      {
        path: 'edit/fleet/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../edit-fleet/edit-fleet.module').then( m => m.EditFleetPageModule)
      },
      {
        path: 'view/fleet',
        loadChildren: () => import('../view-fleet/view-fleet.module').then( m => m.ViewFleetPageModule)
      },
      {
        path: 'view/fleet/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../view-fleet/view-fleet.module').then( m => m.ViewFleetPageModule)
      },
      {
        path: 'edit/vehicle',
        loadChildren: () => import('../edit-vehicle/edit-vehicle.module').then( m => m.EditVehiclePageModule)
      },
      {
        path: 'edit/vehicle/:id',
        resolve: {
          special: DataResolverService
        },
        loadChildren: () => import('../edit-vehicle/edit-vehicle.module').then( m => m.EditVehiclePageModule)
      },
      {
        path: 'search/part',
        loadChildren: () => import('../part/search-part/search-part.module').then( m => m.SearchPartPageModule)
      },
      {
        path: 'view/part-details',
        loadChildren: () => import('../part/view-part-details/view-part-details.module').then( m => m.ViewPartDetailsPageModule)
      },
      {
        path: 'view/service-progress',
        loadChildren: () => import('../view-service-progress/view-service-progress.module').then( m => m.ViewServiceProgressPageModule)
      },
      {
        path: 'capture/initial-inspection-details',
        loadChildren: () => import('../capture-initial-inspection-details/capture-initial-inspection-details.module').then( m => m.CaptureInitialInspectionDetailsPageModule)
      },
      {
        path: 'perform-precheck',
        loadChildren: () => import('../perform-precheck/perform-precheck.module').then( m => m.PerformPrecheckPageModule)
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
