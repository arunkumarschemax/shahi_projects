export class AuthModel {
    userName: string
    role: string
    company: string
    comapnyId: number
    userId: number
    roleId: number

    constructor(
        userName: string,
        role: string,
        company: string,
        comapnyId: number,
        userId: number,
        roleId:number
    ) {
        this.userName = userName
        this.role = role
        this.company = company
        this.comapnyId = comapnyId
        this.userId = userId
        this.roleId = roleId
    }

}