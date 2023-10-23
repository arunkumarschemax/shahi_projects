import { Injectable } from "@nestjs/common";
import { Size } from "../sizes-entity";
import { SizeDto } from "./sizes-dto";
import { Division } from "../../division/division.entity";

@Injectable()
export class SizeAdapter{

    /**
     * 
     * @param  SizeDto
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (sizeDtos :SizeDto, isUpdate:boolean=false):Size {
        const size = new Size();
        size.sizeId=sizeDtos.sizeId;
        size.size=sizeDtos.size;
        size.sizeCode=sizeDtos.sizeCode;
        size.description=sizeDtos.description;
        size.optionGroup=sizeDtos.optionGroup;
        size.division= new Division();
        size.division.divisionId=sizeDtos.divisionId;
        size.division.divisionName=sizeDtos.divisionName;
        size.isActive=sizeDtos.isActive==undefined?true:sizeDtos.isActive;
        if(isUpdate){
            size.updatedUser=sizeDtos.updatedUser;

        }else{
            size.isActive=true;
            size.createdUser=sizeDtos.createdUser;
        
        }
        return size;
    }


    public convertEntityToDto (sizes:Size):SizeDto{
        const sizesvariable= new SizeDto();
        sizesvariable.sizeId=sizes.sizeId;
        sizesvariable.size=sizes.size;
        sizesvariable.sizeCode=sizes.sizeCode;
        sizesvariable.description=sizes.description;
        sizesvariable.optionGroup=sizes.optionGroup;
        sizesvariable.divisionId=(sizes.division)?.divisionId;
        sizesvariable.divisionName=(sizes.division)?.divisionName;
        sizesvariable.isActive=sizes.isActive;
        sizesvariable.createdAt=sizes.createdAt;
        sizesvariable.updatedAt=sizes.updatedAt;
        sizesvariable.updatedUser=sizes.updatedUser;
        sizesvariable.versionFlag=sizes.versionFlag;
        return  sizesvariable;

    }
}