
export class DepartmentsDtos {
    deptId?: number;
    deptName: string;
    deptHead:string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

// export const DepartmentDtoDefault : DepartmentsDtos = {
//     deptId: 0,
//     deptName: "",
//     deptHead:"",
//     isActive: true,
//     createdAt : new Date() ,
//     createdUser : '0',
//     updatedAt : new Date() ,
//     updatedUser : '0',
//     versionFlag : 1
// };