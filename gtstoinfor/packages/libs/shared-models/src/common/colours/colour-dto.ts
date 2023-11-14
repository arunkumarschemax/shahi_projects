export class ColourDto {
    colourId?: number;
    colour: string;
    colourCode:string;
    description:string;
    optionGroup:string;
    divisionId:number;
    divisionName:string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const colourDtoDefault : ColourDto = {
    colourId:0,
    colour:"",
    colourCode:"",
    description:"",
    optionGroup:"",
    divisionId:0,
    divisionName:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

export class ColourModel {
    colourId: number;
    colour: string;
    colourCode:string;
    description:string;
    optionGroup:string;
    divisionId:number;
    divisionName:string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;

    constructor(colourId: number,colour: string,colourCode:string,description:string,optionGroup:string,divisionId:number,divisionName:string,isActive: boolean,createdAt : Date | any,createdUser : string,updatedAt : Date | any,updatedUser : string,versionFlag : number){
        this.colourId = colourId;
        this.colour = colour;
        this.colourCode = colourCode;
        this.description = description;
        this.optionGroup = optionGroup;
        this.divisionId = divisionId;
        this.divisionName = divisionName;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.createdUser = createdUser;
        this.updatedAt  = updatedAt ;
        this.updatedUser = updatedUser;
        this.versionFlag  = versionFlag ;
    }
}