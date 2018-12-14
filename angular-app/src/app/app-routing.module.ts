/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DepartmentComponent } from './Department/Department.component';
import { DegreeComponent } from './Degree/Degree.component';

import { HecComponent } from './Hec/Hec.component';
import { StudentComponent } from './Student/Student.component';
import { UniversityComponent } from './University/University.component';
import { IssuerComponent } from './Issuer/Issuer.component';
import { DeanComponent } from './Dean/Dean.component';
import { RegistrarComponent } from './Registrar/Registrar.component';

import { IssueDegreeComponent } from './IssueDegree/IssueDegree.component';
import { ApproveComponent } from './Approve/Approve.component';
import { HecApproveComponent } from './HecApprove/HecApprove.component';
import { Request_IBCCComponent } from './Request_IBCC/Request_IBCC.component';
import { Request_NadraComponent } from './Request_Nadra/Request_Nadra.component';
import { Add_StudentComponent } from './Add_Student/Add_Student.component';
import { Add_DepartmentComponent } from './Add_Department/Add_Department.component';
import { Add_DeanComponent } from './Add_Dean/Add_Dean.component';
import { Add_IssuerComponent } from './Add_Issuer/Add_Issuer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Department', component: DepartmentComponent },
  { path: 'Degree', component: DegreeComponent },
  { path: 'Hec', component: HecComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'University', component: UniversityComponent },
  { path: 'Issuer', component: IssuerComponent },
  { path: 'Dean', component: DeanComponent },
  { path: 'Registrar', component: RegistrarComponent },
  { path: 'IssueDegree', component: IssueDegreeComponent },
  { path: 'Approve', component: ApproveComponent },
  { path: 'HecApprove', component: HecApproveComponent },
  { path: 'Request_IBCC', component: Request_IBCCComponent },
  { path: 'Request_Nadra', component: Request_NadraComponent },
  { path: 'Add_Student', component: Add_StudentComponent },
  { path: 'Add_Department', component: Add_DepartmentComponent },
  { path: 'Add_Dean', component: Add_DeanComponent },
  { path: 'Add_Issuer', component: Add_IssuerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
