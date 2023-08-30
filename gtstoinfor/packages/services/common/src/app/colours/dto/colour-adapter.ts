import { Injectable } from "@nestjs/common";
import { Colour } from "../colour.entity";
import { ColourDTO } from "./colour-dto";


@Injectable()
export class ColourAdapter{

    /**
     * 
     * @param  ColourDTO
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (colourDto :ColourDTO, isUpdate:boolean=false):Colour {
        const colour = new Colour();
        colour.colourId=colourDto.colourId;
        colour.colour=colourDto.colour;
        colour.isActive=colourDto.isActive==undefined?true:colourDto.isActive;
        if(isUpdate){
            colour.updatedUser=colourDto.updatedUser;

        }else{
            colour.isActive=true;
            colour.createdUser=colourDto.createdUser;
        
        }
        return colour;
    }


    public convertEntityToDto (colour:Colour):ColourDTO{
        const colors= new ColourDTO();
        colors.colourId=colour.colourId;
        colors.colour=colour.colour;
        colors.isActive=colour.isActive;
        colors.createdAt=colour.createdAt;
        colors.updatedAt=colour.updatedAt;
        colors.updatedUser=colour.updatedUser;
        colors.versionFlag=colour.versionFlag;
        return  colors;

    }

}