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
 * @param {org.example.mynetwork.Add_Student} Add_Student
 * @transaction
 */
async function Add_Student(tx) {

    const factory = getFactory();
    const namespace = 'org.example.mynetwork';

    tx.department
    const Registry = await getParticipantRegistry('org.example.mynetwork.Department');
    const dep = await Registry.exists(tx.department);

    if( !dep )
    throw new Error('University Does not Exists...');

    const dep = factory.newResource(namespace, 'Department', tx.DepartmentId);
    dep.name = tx.name;
    dep.university = factory.newRelationship(namespace, 'University', tx.university.getIdentifier());


    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(dep.getFullyQualifiedType());
    // Update the asset in the asset registry.

    await assetRegistry.add(dep);

   
    // Emit an event for the modified asset.

    const applicationEvent = factory.newEvent(namespace, 'Add_Department_Event');
    applicationEvent.department = dep;
    emit(applicationEvent);

}



 /**
 * Check_status 
 * @param {org.example.mynetwork.Add_Department} Add_Department
 * @transaction
 */
async function Add_Department(tx) {

    const factory = getFactory();
    const namespace = 'org.example.mynetwork';


    const Registry = await getParticipantRegistry('org.example.mynetwork.University');
    const uni = await Registry.exists(tx.university.getIdentifier());

    if( !uni)
    throw new Error('University Does not Exists...');

    const dep = factory.newResource(namespace, 'Department', tx.DepartmentId);
    dep.name = tx.name;
    dep.university = factory.newRelationship(namespace, 'University', tx.university.getIdentifier());


    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(dep.getFullyQualifiedType());
    // Update the asset in the asset registry.

    await assetRegistry.add(dep);

   
    // Emit an event for the modified asset.

    const applicationEvent = factory.newEvent(namespace, 'Add_Department_Event');
    applicationEvent.department = dep;
    emit(applicationEvent);

}



 /**
 * Check_status 
 * @param {org.example.mynetwork.Add_Dean} Add_Dean
 * @transaction
 */
async function Add_Dean(tx) {

    const factory = getFactory();
    const namespace = 'org.example.mynetwork';


    const Registry = await getAssetRegistry('org.example.mynetwork.Department');
    const dep = await Registry.exists(tx.department.getIdentifier());

    if( !dep)
    throw new Error('Department Does not Exists...');

    const dean = factory.newResource(namespace, 'Dean', tx.id);
    dean.name = tx.name;
    dean.email = tx.email;
    
    dean.university = factory.newRelationship(namespace, 'University', tx.university.getIdentifier());
    dean.department = factory.newRelationship(namespace, 'Department', tx.department.getIdentifier());


    // Get the asset registry for the asset.
    const assetRegistry = await getParticipantRegistry(dean.getFullyQualifiedType());
    // Update the asset in the asset registry.

    await assetRegistry.add(dean);

   
    // Emit an event for the modified asset.

    const applicationEvent = factory.newEvent(namespace, 'Add_Dean_Event');
    applicationEvent.dean = dean;
    emit(applicationEvent);

}


 /**
 * Check_status 
 * @param {org.example.mynetwork.Add_Issuer} Add_Issuer
 * @transaction
 */
async function Add_Issuer(tx) {

    const factory = getFactory();
    const namespace = 'org.example.mynetwork';


    const Registry = await getAssetRegistry('org.example.mynetwork.Department');
    const dep = await Registry.exists(tx.department.getIdentifier());

    if( !dep)
    throw new Error('Department Does not Exists...');

    const issuer = factory.newResource(namespace, 'Issuer', tx.id);
    issuer.name = tx.name;
    issuer.email = tx.email;
    
    issuer.university = factory.newRelationship(namespace, 'University', tx.university.getIdentifier());
    issuer.department = factory.newRelationship(namespace, 'Department', tx.department.getIdentifier());


    // Get the asset registry for the asset.
    const assetRegistry = await getParticipantRegistry(issuer.getFullyQualifiedType());
    // Update the asset in the asset registry.

    await assetRegistry.add(issuer);

   
    // Emit an event for the modified asset.

    const applicationEvent = factory.newEvent(namespace, 'Add_Issuer_Event');
    applicationEvent.issuer = issuer;
    emit(applicationEvent);

}




// /**
//  * Check_status 
//  * @param {org.example.mynetwork.Check_Status} Check_Status
//  * @transaction
//  */
// async function Check_Status(tx) {
//     const id = tx.id;

//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('org.example.mynetwork.Degree');
//     // Update the asset in the asset registry.
//     const degree = await assetRegistry.get(id);

//     if(degree === "" || typeof(degree) === 'undefined')
//         throw new Error('This Degree has not been found');
    
//     // Emit an event for the modified asset.

//     let event = getFactory().newEvent('org.example.mynetwork', 'Check_Status_Event');
//     event.status = tx.status;
//     emit(event);
// }



/**
 * Check_status 
 * @param {org.example.mynetwork.IssueDegree} IssueDegree
 * @transaction
*/
async function IssueDegree(tx) {
    const factory = getFactory();
    const namespace = 'org.example.mynetwork';
  

    let deg = factory.newResource(namespace, 'Degree', tx.DegreeId);
    deg.Description = tx.Description;
    deg.status = 'AWAITING_APPROVAL';

    deg.issuer = factory.newRelationship(namespace, 'Issuer', getCurrentParticipant().getIdentifier());
    deg.student = factory.newRelationship(namespace, 'Student', tx.student.getIdentifier());


    deg.approval =[factory.newRelationship(namespace,'Issuer', getCurrentParticipant().getIdentifier())] ;
  
     // update approval[]
 
     const assetRegistry = await getAssetRegistry('org.example.mynetwork.Degree');
     await assetRegistry.add(deg);
 
     // Emit an event for the modified asset.
 
    const approveEvent = factory.newEvent(namespace, 'IssueDegree_Event');
    approveEvent.degree = deg;
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

    // const Registry = await getAssetRegistry('org.example.mynetwork.Degree');
    // const degree = await Registry.exists(tx.degree.getIdentifier());

    // if( !degree)
    // throw new Error('Degree Does not Exists...');


    console.log(getCurrentParticipant().getFullyQualifiedType());
    console.log(getCurrentParticipant().getIdentifier());
    console.log(getCurrentParticipant().getType());

     if( deg.status === 'APPROVED')
         throw new Error('This Degree has already been Approved');
     if (deg.approval.includes(namespace, getCurrentParticipant().getType(), getCurrentParticipant().getIdentifier())) {
            throw new Error ('You have already approved this Degree');
        }
    else {

        let flag  = false;
        deg.approval.forEach((approvingParty) => {
            let check;

            try {
                if(approvingParty.getType() === 'Registrar' )
                {
                    flag = true;
                }

                check = approvingParty.getType() === getCurrentParticipant().getType() ;
            } catch (err) {
                // ignore error as they don't have rights to access that participant
            }
            if (check) {
                throw new Error('You have already approved this Degree');
            }
        });

        if(!flag){
            if(getCurrentParticipant().getType() === 'Dean')
             throw new Error('You Cannot approve this Degree before Registrar');   
            
         }

    }
   
    deg.approval.push(factory.newRelationship(namespace, getCurrentParticipant().getType(), getCurrentParticipant().getIdentifier()));
    

     // update the status of the letter if everyone has approved
     if (getCurrentParticipant().getType() === 'Dean') {
         deg.status = 'APPROVED_BY_DEAN';
     }
     if (getCurrentParticipant().getType() === 'Registrar') {
        deg.status = 'APPROVED_BY_REGISTRAR';
    }

     // update approval[]
 
     const assetRegistry = await getAssetRegistry(tx.degree.getFullyQualifiedType());
     await assetRegistry.update(deg);
 
     // Emit an event for the modified asset.
 
     const approveEvent = factory.newEvent(namespace, 'Approve_Event');
    approveEvent.degree = deg;
    emit(approveEvent);

 }

 



 /**
 * Check_status 
 * @param {org.example.mynetwork.HecApprove} HecApprove
 * @transaction
 */
async function HecApprove(tx) {
    const factory = getFactory();
    const namespace = 'org.example.mynetwork';

    let deg = tx.degree;

    let count =0;

        deg.approval.forEach((approvingParty) => {
            try {
            
                if(approvingParty.getType() === 'Registrar' )
                    count++;
                else if(approvingParty.getType() === 'Dean' )
                    count++;
                else if (approvingParty.getType() === 'Issuer' )
                    count++;

            } catch (err) {
                // ignore error as they don't have rights to access that participant
            }
        });

    if(count < 3)
    throw new Error('You Cannot approve this Degree before all other Parties Approval');   


     deg.status = 'APPROVED';

     // update approval[]
 
     const assetRegistry = await getAssetRegistry(tx.degree.getFullyQualifiedType());
     await assetRegistry.update(deg);
 
     // Emit an event for the modified asset.
 
     const approveEvent = factory.newEvent(namespace, 'HecApprove_Event');
    approveEvent.degree = deg;
    emit(approveEvent);

 }

 


