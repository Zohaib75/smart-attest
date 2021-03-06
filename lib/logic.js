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
     * @param {org.example.mynetwork.Request_IBCC} Request_IBCC
     * @transaction
     */
    async function Request_IBCC(tx) {
        const factory = getFactory();
        const namespace = 'org.example.mynetwork';

        const result = await request.get({ uri: 'http://zohaib:2001/'+tx.cnic, json: true });
        if(result.length > 0){

            let concept = factory.newConcept(namespace, 'IBCC_Concept');
            concept.matric = result[0].matric
            concept.inter =  result[0].inter
            
            return concept;

        }


    }


    /**
     * Check_status 
     * @param {org.example.mynetwork.Request_Nadra} Request_Nadra
     * @transaction
     */
    async function Request_Nadra(tx) {
        const factory = getFactory();
        const namespace = 'org.example.mynetwork';

        const result = await request.get({ uri: 'http://zohaib:2000/'+tx.cnic, json: true });

        if(result.length > 0){

            let concept = factory.newConcept(namespace, 'NADRA_Concept');
            concept.name = result[0].name
            concept.Father_name = result[0].Father_name
            concept.Address = result[0].Address
            concept.email = result[0].email
            concept.mobile = result[0].mobile
            concept.city = result[0].city        
            return concept;

        }


    }

    /**
     * Check_status 
     * @param {org.example.mynetwork.Add_Student} Add_Student
     * @transaction
     */
    async function Add_Student(tx) {

        const factory = getFactory();
        const namespace = 'org.example.mynetwork';

        tx.department = tx.department.getIdentifier() + getCurrentParticipant().university.getIdentifier();

        console.log(tx.department);


        const Registry = await getAssetRegistry('org.example.mynetwork.Department');
        const dep = await Registry.exists(tx.department);

        if( !dep )
        throw new Error('Sorry, this University Does not Have this Department...');


        // const s = await getParticipantRegistry('org.example.mynetwork.Student');
        // const stdid = await s.getAll();
       
        // let StudentId = stdid.length + 1 ;

        // StudentId = ;

        const std = factory.newResource(namespace, 'Student', tx.cnic);
    
        std.cnic = tx.cnic;

        std.name = tx.name
        std.Father_name = tx.Father_name
        std.Address = tx.Address
        std.email = tx.email
        std.mobile = tx.mobile
        std.city = tx.city

        std.matric = tx.matric
        std.inter = tx.inter
        
        std.university = factory.newRelationship(namespace, 'University',  getCurrentParticipant().university.getIdentifier());
        std.department = factory.newRelationship(namespace, 'Department',  tx.department);
        
        console.log(std.getFullyQualifiedType())
        // Get the asset registry for the asset.
        const assetRegistry = await getParticipantRegistry(std.getFullyQualifiedType());
        // Update the asset in the asset registry.

        await assetRegistry.add(std);

    
        // Emit an event for the modified asset.

        const applicationEvent = factory.newEvent(namespace, 'Add_Student_Event');
        applicationEvent.student = std;
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

        

        DepartmentId = tx.name + tx.university.getIdentifier();

        const dep = factory.newResource(namespace, 'Department', DepartmentId);
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

        tx.department = tx.department.getIdentifier() + getCurrentParticipant().getIdentifier();

        const Registry = await getAssetRegistry('org.example.mynetwork.Department');
        const dep = await Registry.exists(tx.department);

        if( !dep)
        throw new Error('Department Does not Exists...');

        let d = "dean" + tx.department;
        const dean = factory.newResource(namespace, 'Dean', d);
        dean.name = tx.name;
        dean.email = tx.email;
        dean.landline = tx.landline;
        dean.university = factory.newRelationship(namespace, 'University',  getCurrentParticipant().getIdentifier());
        dean.department = factory.newRelationship(namespace, 'Department', tx.department);


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

        tx.department = tx.department.getIdentifier() + getCurrentParticipant().getIdentifier();

        const Registry = await getAssetRegistry('org.example.mynetwork.Department');
        const dep = await Registry.exists(tx.department);

        if( !dep)
        throw new Error('Department Does not Exists...');
        const i = "issuer" + tx.department;
        const issuer = factory.newResource(namespace, 'Issuer', i);
        issuer.name = tx.name;
        issuer.email = tx.email;
        issuer.landline = tx.landline;
        
        issuer.university = factory.newRelationship(namespace, 'University',  getCurrentParticipant().getIdentifier());
        issuer.department = factory.newRelationship(namespace, 'Department', tx.department);


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
    
        const d = await getAssetRegistry('org.example.mynetwork.Degree');
        const stdid = await d.getAll();

        let DegreeId = stdid.length+1 ;

        DegreeId = DegreeId.toString();
        
        let deg = factory.newResource(namespace, 'Degree', DegreeId);
        deg.Description = tx.Description;
        deg.status = 'AWAITING_APPROVAL';
        deg.issued_Date = tx.issued_Date;

        deg.university = factory.newRelationship(namespace, 'University', getCurrentParticipant().university.getIdentifier())
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

        const Registry = await getAssetRegistry('org.example.mynetwork.Degree');
        const degree = await Registry.exists(tx.degree.getIdentifier());

        if( !degree)
        throw new Error('Degree Does not Exists...');


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