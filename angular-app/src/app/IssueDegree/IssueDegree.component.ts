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
import { IssueDegreeService } from './IssueDegree.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-issuedegree',
  templateUrl: './IssueDegree.component.html',
  styleUrls: ['./IssueDegree.component.css'],
  providers: [IssueDegreeService]
})
export class IssueDegreeComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  DegreeId = new FormControl('', Validators.required);
  Description = new FormControl('', Validators.required);
  issued_Date = new FormControl('', Validators.required);
  student = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceIssueDegree: IssueDegreeService, fb: FormBuilder) {
    this.myForm = fb.group({
      DegreeId: this.DegreeId,
      Description: this.Description,
      issued_Date: this.issued_Date,
      student: this.student,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceIssueDegree.getAll()
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
      $class: 'org.example.mynetwork.IssueDegree',
      'DegreeId': this.DegreeId.value,
      'Description': this.Description.value,
      'issued_Date': event.toISOString(),
      'student': 'org.example.mynetwork.Student'+this.student.value,
      'transactionId': "",
      'timestamp': event.toISOString(),


    };

    this.myForm.setValue({
      'DegreeId': null,
      'Description': null,
      'issued_Date': null,
      'student': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceIssueDegree.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'DegreeId': null,
        'Description': null,
        'issued_Date': null,
        'student': null,
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
      $class: 'org.example.mynetwork.IssueDegree',
      'DegreeId': this.DegreeId.value,
      'Description': this.Description.value,
      'issued_Date': this.issued_Date.value,
      'student': this.student.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceIssueDegree.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.serviceIssueDegree.deleteTransaction(this.currentId)
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

    return this.serviceIssueDegree.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'DegreeId': null,
        'Description': null,
        'issued_Date': null,
        'student': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.DegreeId) {
        formObject.DegreeId = result.DegreeId;
      } else {
        formObject.DegreeId = null;
      }

      if (result.Description) {
        formObject.Description = result.Description;
      } else {
        formObject.Description = null;
      }

      if (result.issued_Date) {
        formObject.issued_Date = result.issued_Date;
      } else {
        formObject.issued_Date = null;
      }

      if (result.student) {
        formObject.student = result.student;
      } else {
        formObject.student = null;
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
    let event = new Date();
    this.myForm.setValue({
      'DegreeId': null,
      'Description': null,
      'issued_Date': event.toISOString(),
      'student': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
