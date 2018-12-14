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
import { Add_StudentService } from './Add_Student.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-add_student',
  templateUrl: './Add_Student.component.html',
  styleUrls: ['./Add_Student.component.css'],
  providers: [Add_StudentService]
})
export class Add_StudentComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
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
  department = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceAdd_Student: Add_StudentService, fb: FormBuilder) {
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
      department: this.department,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAdd_Student.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    let event = new Date();
    this.Transaction = {
      $class: 'org.example.mynetwork.Add_Student',
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
      'department': 'org.example.mynetwork.Department'+this.department.value,
      'transactionId': "",
      'timestamp':  event.toISOString()
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
      'department': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceAdd_Student.addTransaction(this.Transaction)
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
        'department': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.mynetwork.Add_Student',
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
      'department': this.department.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceAdd_Student.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceAdd_Student.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceAdd_Student.getTransaction(id)
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
        'department': null,
        'transactionId': null,
        'timestamp': null
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

      if (result.department) {
        formObject.department = result.department;
      } else {
        formObject.department = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'department': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
