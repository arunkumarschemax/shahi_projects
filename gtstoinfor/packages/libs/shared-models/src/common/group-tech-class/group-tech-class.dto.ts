export class GroupTechClassDto{
    groupTechClassId:number;
    groupTechClassCode:string;
    groupTechClassDescription: string;
    buyerId: number;
    divisionId: number;
    createdUser:string;
    createdAt:Date;
    updatedAt:Date;
    updatedUser:string;
    isActive:boolean;
    versionFlag : number;


}


export const groupTechClassDtoDefault : GroupTechClassDto = {
    
    groupTechClassId:0,
    groupTechClassCode:"",
    groupTechClassDescription: "",
    buyerId: 0,
    divisionId: 0,
    createdUser:'0',
    createdAt:new Date() ,
    updatedAt:new Date() ,
    updatedUser:'0',
    isActive:true,
    versionFlag : 1

   
   
};
