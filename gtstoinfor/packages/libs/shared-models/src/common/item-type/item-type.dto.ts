export class ItemTypeDto {
    itemTypeId: number;
    
    itemType: string;

    productGroupId:number;

    productGroupName:string;
    
    divisionId:number;

    divisionName:string;

    isActive: boolean;

    createdAt : Date | any;

    createdUser : string;

    updatedAt : Date | any;

    updatedUser : string;

    versionFlag : number;
}

export const ItemTypeDtosDefault : ItemTypeDto = {
    itemTypeId:0,
    itemType:"",
    productGroupId:0,
    productGroupName:"",
    divisionId:0,
    divisionName:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};