import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      //Iteration 4 Routing
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
        path: 'update/password',
        loadChildren: () => import('../update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
      },
      {
        path: 'dashboard/client',
        loadChildren: () => import('../dashboard-client/dashboard-client.module').then( m => m.DashboardClientPageModule)
      },
      {
        path: 'dashboard/employee',
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
      //Iteration 5 Routing
      {
        path: 'add/vehicle',
        loadChildren: () => import('../add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
      },
      {
        path: 'edit/vehicle',
        loadChildren: () => import('../edit-vehicle/edit-vehicle.module').then( m => m.EditVehiclePageModule)
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
        path: 'assign/dealership',
        loadChildren: () => import('../assign-dealership/assign-dealership.module').then( m => m.AssignDealershipPageModule)
      },
      {
        path: 'edit/dealership',
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
        path: 'create-fleet',
        loadChildren: () => import('../create-fleet/create-fleet.module').then( m => m.CreateFleetPageModule)
      },
      {
        path: 'edit-fleet',
        loadChildren: () => import('../edit-fleet/edit-fleet.module').then( m => m.EditFleetPageModule)
      }


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
