import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {GroupFinderComponent} from './group-finder/group-finder.component';
import {CreatedGroupComponent} from './created-group/created-group.component';
import {Role} from './_models/role';


const routes: Routes = [{path: '', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}, { path: 'register', component: RegisterComponent },
  {path: 'group', component: CreatedGroupComponent}, {path: 'find', component: GroupFinderComponent},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
