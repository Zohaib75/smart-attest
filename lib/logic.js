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

'use strict';
/**
 * Write your transction processor functions here
 */


/**
 * Check_status 
 * @param {org.example.mynetwork.Check_Status} Check_Status
 * @transaction
 */
async function Check_Status(tx) {
    const id = tx.id;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Degree');
    // Update the asset in the asset registry.
    const degree = await assetRegistry.get(id);

    if(degree === "" || typeof(degree) === 'undefined')
        throw new Error('This Degree has not been found');
    
    // Emit an event for the modified asset.

    let event = getFactory().newEvent('org.example.mynetwork', 'Check_Status_Event');
    event.status = tx.status;
    emit(event);
}



/**
 * Check_status 
 * @param {org.example.mynetwork.Request_Attest_Degree} Request_Attest_Degree
 * @transaction
 */
async function Request_Attest_Degree(tx) {
   
   let degree = tx.degree;
    if(tx.degree.status === "" || typeof(tx.degree.status) === 'undefined')
        throw new Error('This Degree has not been found');
    else if( tx.degree.status !== 'REQUEST_APPROVAL')
        throw new Error('This Degree has already been sent for Approval');

    degree.status = 'AWAITING_APPROVAL';

    const assetRegistry = await getAssetRegistry(tx.degree.getFullyQualifiedType());
    await assetRegistry.update(degree);


    // Emit an event for the modified asset.

    let event = getFactory().newEvent('org.example.mynetwork', 'Request_Attest_Degree_Event');
    event.status = tx.degree.status;
    emit(event);
}



/**
 * Check_status 
 * @param {org.example.mynetwork.IssueDegree} IssueDegree
 * @transaction
*/
async function IssueDegree(tx) {
    const factory = getFactory();
    const namespace = 'org.example.mynetwork';
  
    let deg = tx.degree;
    
    if(tx.degree.status === "" || typeof(tx.degree.status) === 'undefined')
         throw new Error('This Degree has not been found');
     else if( tx.degree.status === 'APPROVED')
         throw new Error('This Degree has already been Approved');
     else if( typeof(tx.degree.approval) !== 'undefined' ){ 
         if (tx.degree.approval.includes(tx.approvingParty)) {
            throw new Error ('You have already approved this Degree');
        }
	}

   
    deg.approval.push(factory.newRelationship(namespace, tx.approvingParty.getType(), tx.approvingParty.getIdentifier()));
    
     // update the status of the letter if everyone has approved
     if (tx.approvingParty.getType() === 'Dean') {
         deg.status = 'APPROVED_BY_DEAN';
     }
     else if (tx.approvingParty.getType() === 'Registrar') {
        deg.status = 'APPROVED_BY_REGISTRAR';
    }
    else
        deg.status = 'APPROVED';


     // update approval[]
 
     const assetRegistry = await getAssetRegistry(tx.degree.getFullyQualifiedType());
     await assetRegistry.update(deg);
 
     // Emit an event for the modified asset.
 
     const approveEvent = factory.newEvent(namespace, 'Approve_Event');
    approveEvent.degree = tx.degree;
    approveEvent.approvingParty = tx.approvingParty;
    emit(approveEvent);


}


/**
 * Check_status 
 * @param {org.example.mynetwork.Approve} Approve
 * @transaction
 */
async function Approve(tx) {
       const factory = getFactory();
    const namespace = 'org.example.mynetwork';

    let deg = tx.degree;
    
    if(tx.degree.status === "" || typeof(tx.degree.status) === 'undefined')
         throw new Error('This Degree has not been found');
     else if( tx.degree.status === 'APPROVED')
         throw new Error('This Degree has already been Approved');
     else if( typeof(tx.degree.approval) !== 'undefined' ){ 
         if (tx.degree.approval.includes(tx.approvingParty)) {
            throw new Error ('You have already approved this Degree');
        }
	}

   
    deg.approval.push(factory.newRelationship(namespace, tx.approvingParty.getType(), tx.approvingParty.getIdentifier()));
    
     // update the status of the letter if everyone has approved
     if (tx.approvingParty.getType() === 'Dean') {
         deg.status = 'APPROVED_BY_DEAN';
     }
     else if (tx.approvingParty.getType() === 'Registrar') {
        deg.status = 'APPROVED_BY_REGISTRAR';
    }
    else
        deg.status = 'APPROVED';


     // update approval[]
 
     const assetRegistry = await getAssetRegistry(tx.degree.getFullyQualifiedType());
     await assetRegistry.update(deg);
 
     // Emit an event for the modified asset.
 
     const approveEvent = factory.newEvent(namespace, 'Approve_Event');
    approveEvent.degree = tx.degree;
    approveEvent.approvingParty = tx.approvingParty;
    emit(approveEvent);

 }

 


