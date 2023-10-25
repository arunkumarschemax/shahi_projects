import { Injectable } from "@nestjs/common";
import { Colour } from "../colour.entity";
import { ColourDTO } from "./colour-dto";
import { Division } from "../../division/division.entity";


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
        colour.colourCode=colourDto.colourCode;
        colour.description=colourDto.description;
        colour.optionGroup=colourDto.optionGroup;
        colour.division= new Division();
        colour.division.divisionId=colourDto.divisionId;
        colour.division.divisionName=colourDto.divisionName;
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
        colors.colourCode=colour.colourCode;
        colors.description=colour.description;
        colors.optionGroup=colour.optionGroup;
        colors.divisionId=(colour.division)?.divisionId;
        colors.divisionName=(colour.division)?.divisionName;
        colors.isActive=colour.isActive;
        colors.createdAt=colour.createdAt;
        colors.updatedAt=colour.updatedAt;
        colors.updatedUser=colour.updatedUser;
        colors.versionFlag=colour.versionFlag;
        return  colors;

    }

}