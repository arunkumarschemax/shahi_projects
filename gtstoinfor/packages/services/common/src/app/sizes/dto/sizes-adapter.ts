import { Injectable } from "@nestjs/common";
import { Size } from "../sizes-entity";
import { SizeDto } from "./sizes-dto";

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
        sizesvariable.isActive=sizes.isActive;
        sizesvariable.createdAt=sizes.createdAt;
        sizesvariable.updatedAt=sizes.updatedAt;
        sizesvariable.updatedUser=sizes.updatedUser;
        sizesvariable.versionFlag=sizes.versionFlag;
        return  sizesvariable;

    }
}