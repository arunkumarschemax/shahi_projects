import { Injectable } from "@nestjs/common";
import { Fabrics } from "../fabrics-entity";
import { FabricsDTO } from "./fabrics.dto";


@Injectable()
export class FabricsAdapter{

    /**
     * 
     * @param  FabricsDTO
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (fabricsDto :FabricsDTO, isUpdate:boolean=false):Fabrics {
        const fabrics = new Fabrics();
        fabrics.fabricsId=fabricsDto.fabricsId;
        fabrics.fabricsName=fabricsDto.fabricsName;
        fabrics.fabricsCode=fabricsDto.fabricsCode;
        fabrics.description=fabricsDto.description;
        fabrics.isActive=fabricsDto.isActive==undefined?true:fabricsDto.isActive;
        if(isUpdate){
            fabrics.updatedUser=fabricsDto.updatedUser;

        }else{
            fabrics.isActive=true;
            fabrics.createdUser=fabricsDto.createdUser;
        
        }
        return fabrics;
    }


    public convertEntityToDto (fabricsData:Fabrics):FabricsDTO{
        const fabrics= new FabricsDTO();
        fabrics.fabricsId=fabricsData.fabricsId;
        fabrics.fabricsName=fabricsData.fabricsName;
        fabrics.fabricsCode=fabricsData.fabricsCode;
        fabrics.description=fabricsData.description;
        fabrics.isActive=fabricsData.isActive;
        fabrics.createdAt=fabricsData.createdAt;
        fabrics.updatedAt=fabricsData.updatedAt;
        fabrics.updatedUser=fabricsData.updatedUser;
        fabrics.versionFlag=fabricsData.versionFlag;
        return  fabrics;

    }

}