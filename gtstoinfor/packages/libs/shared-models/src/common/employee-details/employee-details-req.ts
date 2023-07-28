
export class EmployeeDetailsResponse{
    employeeCode:string;
    firstName:string;
    lastName:string;
    dateOfBirth: any;
    alterNativeMobileNumber: string;
    mobileNumber: string;
    emial: string;
    address: string;
    pinCode: number;
    employeeId?:number
    updateUser?:string
    createdUser?:string
    constructor(
        employeeCode:string,
        firstName:string,
        lastName:string,
        dateOfBirth: any,
        alterNativeMobileNumber: string,
        mobileNumber: string,
        emial: string,
        address: string,
        pinCode: number,
      employeeId?:number,
      updateUser?:string,
      createdUser?:string

    ){
        this.employeeCode=employeeCode
        this.firstName=firstName;
        this.lastName=lastName
        this.dateOfBirth=dateOfBirth
        this.alterNativeMobileNumber=alterNativeMobileNumber
        this.mobileNumber=mobileNumber
        this.emial=emial
        this.address=address
        this.pinCode=pinCode
        this.employeeId=employeeId
        this.updateUser=updateUser
        this.createdUser=createdUser

    }
  
}