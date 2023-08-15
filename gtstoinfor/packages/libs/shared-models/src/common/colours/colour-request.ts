export class ColourRequestDto{
    colourId:number;
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

    constructor(colourId:number,updatedUser:string, colour:string, isActive:boolean,versionFlag:number){
        this.colourId = colourId;
        this.updatedUser = updatedUser;
        this.colour = colour;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }