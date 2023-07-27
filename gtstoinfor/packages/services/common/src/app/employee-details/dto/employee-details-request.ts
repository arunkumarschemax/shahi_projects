import { ApiProperty } from "@nestjs/swagger";

export class EmployeeDetailsResponse{
  @ApiProperty()
  employeeCode:string;
  @ApiProperty()
  firstName:string;
  @ApiProperty()
  lastName:string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  alterNativeMobileNumber: string;
  @ApiProperty()
  mobileNumber: string;
  @ApiProperty()
  emial: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  pinCode: number;
  @ApiProperty()
  employeeId?:number
  @ApiProperty()
  updateUser?:string
  @ApiProperty()
  createdUser?:string
  constructor(
      employeeCode:string,
      firstName:string,
      lastName:string,
      dateOfBirth: Date,
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