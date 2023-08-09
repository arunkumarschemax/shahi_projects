import { Injectable } from "@nestjs/common";
import { ProfitCenter } from "../profit-center-entity";
import { ProfitCenterDTO } from "./profit-center.dto";


@Injectable()
export class ProfitCenterAdapter{

    /**
     * 
     * @param  ProfitCenterDTO
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (profitcenterDto :ProfitCenterDTO, isUpdate:boolean=false):ProfitCenter {
        const profitcenter = new ProfitCenter();
        profitcenter.profitCenterId=profitcenterDto.profitCenterId;
        profitcenter.profitCenter=profitcenterDto.profitCenter;
        profitcenter.isActive=profitcenterDto.isActive==undefined?true:profitcenterDto.isActive;
        if(isUpdate){
            profitcenter.updatedUser=profitcenterDto.updatedUser;

        }else{
            profitcenter.isActive=true;
            profitcenter.createdUser=profitcenterDto.createdUser;
        
        }
        return profitcenter;
    }


    public convertEntityToDto (profitCenterData:ProfitCenter):ProfitCenterDTO{
        const profitcenter = new ProfitCenterDTO();
        profitcenter.profitCenterId=profitCenterData.profitCenterId;
        profitcenter.profitCenter=profitCenterData.profitCenter;
        profitcenter.isActive=profitCenterData.isActive;
        profitcenter.createdAt=profitCenterData.createdAt;
        profitcenter.updatedAt=profitCenterData.updatedAt;
        profitcenter.updatedUser=profitCenterData.updatedUser;
        profitcenter.versionFlag=profitCenterData.versionFlag;
        return  profitcenter;

    }

}