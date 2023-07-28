export class employeeIdReq{
    employeeId:number
    versionFlag?: number
    isActive ?: boolean
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