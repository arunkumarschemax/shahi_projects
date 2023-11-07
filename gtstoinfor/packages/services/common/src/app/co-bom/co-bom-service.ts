import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoBom } from './co-bom.entity';
import { CoBomAdapter } from './dto/co-bom.adapter';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { CoBomRepository } from './dto/co-bom.repo';



@Injectable()
export class CoBomService {
    constructor(
        // @InjectRepository(CoBom) private coBomRepository: Repository<CoBom>,
        private CoAdapter: CoBomAdapter,
        private corepo:CoBomRepository
    ) { }


    
    async getBom ():Promise<CommonResponseModel>{
        try{
            const getBom = await  this.corepo.getBomagainstitem()
            if(getBom){
                return new  CommonResponseModel(true,1,'data retreived', getBom)
            }else{

                return new CommonResponseModel(false,0,'No data found')
          
              }

        }catch(err){
            throw err

        }
    }
    }
