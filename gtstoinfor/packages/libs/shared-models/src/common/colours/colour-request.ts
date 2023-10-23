export class ColourRequestDto{
    colourId:number;
    colourCode:string;
    description:string;
    optionGroup:string;
    updatedUser:string;
    colour:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param colourId This is a number
     * @param colourThis is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(colourId:number,colourCode:string,description:string,optionGroup:string,updatedUser:string, colour:string, isActive:boolean,versionFlag:number){
        this.colourId = colourId;
        this.colourCode=colourCode;
        this.description=description;
        this.optionGroup=optionGroup;
        this.updatedUser = updatedUser;
        this.colour = colour;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }