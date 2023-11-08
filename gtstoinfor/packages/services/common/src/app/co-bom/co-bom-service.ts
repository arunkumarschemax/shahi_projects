import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoBom } from './co-bom.entity';
import { CoBomAdapter } from './dto/co-bom.adapter';
import { CommonResponseModel, StyleOrderIdReq } from '@project-management-system/shared-models';
import { CoBomRepository } from './dto/co-bom.repo';
import { StyleOrderId } from '../style-order/style-order-id.request';



@Injectable()
export class CoBomService {
    constructor(
        // @InjectRepository(CoBom) private coBomRepository: Repository<CoBom>,
        private CoAdapter: CoBomAdapter,
        private corepo:CoBomRepository
    ) { }


    
    async getBomAgainstItem (req?:StyleOrderId):Promise<CommonResponseModel>{

        try{

            const getBom = await  this.corepo.getBomAgainstItem(req)
            console.log(getBom,"data..........")
            if(getBom){
                 return new  CommonResponseModel(true,1,'data retreived', getBom)
            }else{
                return new CommonResponseModel(false,0,'No data found',)
              }
               

        }catch(err){
            throw err

        }
    }
    async getDataForMOPById(req?:StyleOrderId): Promise<CommonResponseModel> {
        try {
        const data = await this.corepo.getDataForMOPByCoNumber(req)
       // console.log(data,"dada")
        if(data.length == 0){
            return new CommonResponseModel(false,0,"No data found",[])
        } 
       return new CommonResponseModel(true, 0, "MOPData retrieved  successfully", data);
    
        }catch (err) {
            throw err;
          }
    }

}
