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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DepartmentComponent,
    DegreeComponent,
    HecComponent,
    StudentComponent,
    UniversityComponent,
    IssuerComponent,
    DeanComponent,
    RegistrarComponent,
    IssueDegreeComponent,
    ApproveComponent,
    HecApproveComponent,
    Request_IBCCComponent,
    Request_NadraComponent,
    Add_StudentComponent,
    Add_DepartmentComponent,
    Add_DeanComponent,
    Add_IssuerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
