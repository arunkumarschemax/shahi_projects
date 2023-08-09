export class ProfitCenterDto {
   profitCenterId?: number;
   profitCenter: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const ProfitCenterDtoDefault : ProfitCenterDto = {
    profitCenterId:0,
    profitCenter:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};