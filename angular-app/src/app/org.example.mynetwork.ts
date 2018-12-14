import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export enum DegreeStatus {
      AWAITING_APPROVAL,
      APPROVED_BY_REGISTRAR,
      APPROVED_BY_DEAN,
      APPROVED,
   }
   export class Hec extends Participant {
      HecId: string;
      email: string;
      designation: string;
      mobile: string;
      city: string;
   }
   export class Student extends Participant {
      StudentId: string;
      cnic: string;
      name: string;
      Father_name: string;
      Address: string;
      email: string;
      mobile: string;
      city: string;
      matric: number;
      inter: number;
      university: University;
      department: Department;
   }
   export class University extends Participant {
      UniversityId: string;
      name: string;
      email: string;
      category: string;
      sector: string;
      landline: string;
      city: string;
   }
   export class Department extends Asset {
      DepartmentId: string;
      name: string;
      university: University;
   }
   export abstract class Employee extends Participant {
      EmployeeId: string;
      name: string;
      email: string;
      university: University;
   }
   export class Issuer extends Employee {
      department: Department;
   }
   export class Dean extends Employee {
      department: Department;
   }
   export class Registrar extends Employee {
   }
   export class Degree extends Asset {
      DegreeId: string;
      Description: string;
      status: DegreeStatus;
      issued_Date: Date;
      issuer: Issuer;
      student: Student;
      approval: Employee[];
   }
   export class IssueDegree extends Transaction {
      DegreeId: string;
      Description: string;
      issued_Date: Date;
      student: Student;
   }
   export class IssueDegree_Event extends Event {
      degree: Degree;
   }
   export class Approve extends Transaction {
      degree: Degree;
   }
   export class Approve_Event extends Event {
      degree: Degree;
   }
   export class HecApprove extends Transaction {
      degree: Degree;
   }
   export class HecApprove_Event extends Event {
      degree: Degree;
   }
   export class IBCC_Concept {
      matric: number;
      inter: number;
   }
   export class Request_IBCC extends Transaction {
      cnic: string;
   }
   export class NADRA_Concept {
      name: string;
      Father_name: string;
      Address: string;
      email: string;
      mobile: string;
      city: string;
   }
   export class Request_Nadra extends Transaction {
      cnic: string;
   }
   export class Add_Student extends Transaction {
      StudentId: string;
      cnic: string;
      name: string;
      Father_name: string;
      Address: string;
      email: string;
      mobile: string;
      city: string;
      matric: number;
      inter: number;
      department: Department;
   }
   export class Add_Student_Event extends Event {
      student: Student;
   }
   export class Add_Department extends Transaction {
      DepartmentId: string;
      name: string;
      university: University;
   }
   export class Add_Department_Event extends Event {
      department: Department;
   }
   export class Add_Dean extends Transaction {
      id: string;
      name: string;
      email: string;
      university: University;
      department: Department;
   }
   export class Add_Dean_Event extends Event {
      dean: Dean;
   }
   export class Add_Issuer extends Transaction {
      id: string;
      name: string;
      email: string;
      university: University;
      department: Department;
   }
   export class Add_Issuer_Event extends Event {
      issuer: Issuer;
   }
// }
