import { Injectable } from "@nestjs/common";
import { ProfitControlHead } from "../profit-control-head-entity";
import { ProfitControlHeadDTO } from "./profit-control-head.dto";


@Injectable()
export class ProfitColtrolHeadAdapter{

    /**
     * 
     * @param  ProfitCenterDTO
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity (profitcontrolheadDto :ProfitControlHeadDTO, isUpdate:boolean=false):ProfitControlHead {
        const profitcontrolhead = new ProfitControlHead();
        profitcontrolhead.profitControlHeadId=profitcontrolheadDto.profitControlHeadId;
        profitcontrolhead.profitControlHead=profitcontrolheadDto.profitControlHead;
        profitcontrolhead.isActive=profitcontrolheadDto.isActive==undefined?true:profitcontrolheadDto.isActive;
        if(isUpdate){
            profitcontrolhead.updatedUser=profitcontrolheadDto.updatedUser;

        }else{
            profitcontrolhead.isActive=true;
            profitcontrolhead.createdUser=profitcontrolheadDto.createdUser;
        
        }
        return profitcontrolhead;
    }


    public convertEntityToDto (profitControlData:ProfitControlHead):ProfitControlHeadDTO{
        const profitcontrolHead= new ProfitControlHeadDTO();
        profitcontrolHead.profitControlHeadId=profitControlData.profitControlHeadId;
        profitcontrolHead.profitControlHead=profitControlData.profitControlHead;
        profitcontrolHead.isActive=profitControlData.isActive;
        profitcontrolHead.createdAt=profitControlData.createdAt;
        profitcontrolHead.updatedAt=profitControlData.updatedAt;
        profitcontrolHead.updatedUser=profitControlData.updatedUser;
        profitcontrolHead.versionFlag=profitControlData.versionFlag;
        return  profitcontrolHead;

    }

}