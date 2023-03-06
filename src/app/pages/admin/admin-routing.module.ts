import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { NonAuthGuard } from "src/app/guards/non-auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'login',
    canActivate: [NonAuthGuard],
    component: LoginComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
