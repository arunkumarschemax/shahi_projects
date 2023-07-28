import { ApiProperty } from "@nestjs/swagger"
import { isContext } from "vm";

export class EmployeeIdReq{
    @ApiProperty()
    employeeId:number
    @ApiProperty()
    versionFlag?: number;
    @ApiProperty()
    isActive ?: boolean;
    constructor(
        employeeId:number,
    versionFlag?: number,
    isActive ?: boolean
    ){
        this.employeeId=employeeId
        this.versionFlag=versionFlag
        this.isActive=isActive
    }
}