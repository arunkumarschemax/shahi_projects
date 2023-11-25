export class RackPositionDto {
    positionId?:number;
    rackPositionName: string;
     levelId?: number;
    levelName?: string;
   columnId?: number;
    column?: string;
    remarks: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

export const RackPositionDtoDefault : RackPositionDto = {
    rackPositionName: "",
    remarks: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};