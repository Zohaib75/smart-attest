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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from './Student.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  StudentId = new FormControl('', Validators.required);
  cnic = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  Father_name = new FormControl('', Validators.required);
  Address = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  mobile = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  matric = new FormControl('', Validators.required);
  inter = new FormControl('', Validators.required);
  university = new FormControl('', Validators.required);
  department = new FormControl('', Validators.required);


  constructor(public serviceStudent: StudentService, fb: FormBuilder) {
    this.myForm = fb.group({
      StudentId: this.StudentId,
      cnic: this.cnic,
      name: this.name,
      Father_name: this.Father_name,
      Address: this.Address,
      email: this.email,
      mobile: this.mobile,
      city: this.city,
      matric: this.matric,
      inter: this.inter,
      university: this.university,
      department: this.department
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceStudent.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.mynetwork.Student',
      'StudentId': this.StudentId.value,
      'cnic': this.cnic.value,
      'name': this.name.value,
      'Father_name': this.Father_name.value,
      'Address': this.Address.value,
      'email': this.email.value,
      'mobile': this.mobile.value,
      'city': this.city.value,
      'matric': this.matric.value,
      'inter': this.inter.value,
      'university':'org.example.mynetwork.University#'+ this.university.value,
      'department':'org.example.mynetwork.Department#'+ this.department.value
    };

    this.myForm.setValue({
      'StudentId': null,
      'cnic': null,
      'name': null,
      'Father_name': null,
      'Address': null,
      'email': null,
      'mobile': null,
      'city': null,
      'matric': null,
      'inter': null,
      'university': null,
      'department': null
    });

    return this.serviceStudent.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'StudentId': null,
        'cnic': null,
        'name': null,
        'Father_name': null,
        'Address': null,
        'email': null,
        'mobile': null,
        'city': null,
        'matric': null,
        'inter': null,
        'university': null,
        'department': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.mynetwork.Student',
      'cnic': this.cnic.value,
      'name': this.name.value,
      'Father_name': this.Father_name.value,
      'Address': this.Address.value,
      'email': this.email.value,
      'mobile': this.mobile.value,
      'city': this.city.value,
      'matric': this.matric.value,
      'inter': this.inter.value,
      'university': this.university.value,
      'department': this.department.value
    };

    return this.serviceStudent.updateParticipant(form.get('StudentId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceStudent.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceStudent.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'StudentId': null,
        'cnic': null,
        'name': null,
        'Father_name': null,
        'Address': null,
        'email': null,
        'mobile': null,
        'city': null,
        'matric': null,
        'inter': null,
        'university': null,
        'department': null
      };

      if (result.StudentId) {
        formObject.StudentId = result.StudentId;
      } else {
        formObject.StudentId = null;
      }

      if (result.cnic) {
        formObject.cnic = result.cnic;
      } else {
        formObject.cnic = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.Father_name) {
        formObject.Father_name = result.Father_name;
      } else {
        formObject.Father_name = null;
      }

      if (result.Address) {
        formObject.Address = result.Address;
      } else {
        formObject.Address = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.mobile) {
        formObject.mobile = result.mobile;
      } else {
        formObject.mobile = null;
      }

      if (result.city) {
        formObject.city = result.city;
      } else {
        formObject.city = null;
      }

      if (result.matric) {
        formObject.matric = result.matric;
      } else {
        formObject.matric = null;
      }

      if (result.inter) {
        formObject.inter = result.inter;
      } else {
        formObject.inter = null;
      }

      if (result.university) {
        formObject.university = result.university;
      } else {
        formObject.university = null;
      }

      if (result.department) {
        formObject.department = result.department;
      } else {
        formObject.department = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'StudentId': null,
      'cnic': null,
      'name': null,
      'Father_name': null,
      'Address': null,
      'email': null,
      'mobile': null,
      'city': null,
      'matric': null,
      'inter': null,
      'university': null,
      'department': null
    });
  }
}
