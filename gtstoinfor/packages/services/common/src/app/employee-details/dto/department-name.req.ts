import { ApiProperty } from "@nestjs/swagger"

export class DepartmentReq{
    @ApiProperty()
    department:string
    
    constructor(
        department:string
    ){
        this.department=department
    }
}