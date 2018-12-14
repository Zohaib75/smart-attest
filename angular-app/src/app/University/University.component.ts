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
import { UniversityService } from './University.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-university',
  templateUrl: './University.component.html',
  styleUrls: ['./University.component.css'],
  providers: [UniversityService]
})
export class UniversityComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  UniversityId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  sector = new FormControl('', Validators.required);
  landline = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);


  constructor(public serviceUniversity: UniversityService, fb: FormBuilder) {
    this.myForm = fb.group({
      UniversityId: this.UniversityId,
      name: this.name,
      email: this.email,
      category: this.category,
      sector: this.sector,
      landline: this.landline,
      city: this.city
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceUniversity.getAll()
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
      $class: 'org.example.mynetwork.University',
      'UniversityId': this.UniversityId.value,
      'name': this.name.value,
      'email': this.email.value,
      'category': this.category.value,
      'sector': this.sector.value,
      'landline': this.landline.value,
      'city': this.city.value
    };

    this.myForm.setValue({
      'UniversityId': null,
      'name': null,
      'email': null,
      'category': null,
      'sector': null,
      'landline': null,
      'city': null
    });

    return this.serviceUniversity.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'UniversityId': null,
        'name': null,
        'email': null,
        'category': null,
        'sector': null,
        'landline': null,
        'city': null
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
      $class: 'org.example.mynetwork.University',
      'name': this.name.value,
      'email': this.email.value,
      'category': this.category.value,
      'sector': this.sector.value,
      'landline': this.landline.value,
      'city': this.city.value
    };

    return this.serviceUniversity.updateParticipant(form.get('UniversityId').value, this.participant)
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

    return this.serviceUniversity.deleteParticipant(this.currentId)
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

    return this.serviceUniversity.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'UniversityId': null,
        'name': null,
        'email': null,
        'category': null,
        'sector': null,
        'landline': null,
        'city': null
      };

      if (result.UniversityId) {
        formObject.UniversityId = result.UniversityId;
      } else {
        formObject.UniversityId = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.category) {
        formObject.category = result.category;
      } else {
        formObject.category = null;
      }

      if (result.sector) {
        formObject.sector = result.sector;
      } else {
        formObject.sector = null;
      }

      if (result.landline) {
        formObject.landline = result.landline;
      } else {
        formObject.landline = null;
      }

      if (result.city) {
        formObject.city = result.city;
      } else {
        formObject.city = null;
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
      'UniversityId': null,
      'name': null,
      'email': null,
      'category': null,
      'sector': null,
      'landline': null,
      'city': null
    });
  }
}
