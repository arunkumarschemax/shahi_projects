// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ScanEntity } from '../entity/typeo-entity';
// import { ScanAdapter } from '../adapters/scan-adapters';
// import { ScanDto } from '../dtos/typeo.dto';
// @Injectable()
// export class ScanService {
//   constructor(
//     private scanadapter:ScanAdapter,
//     @InjectRepository(ScanEntity)
//     private scanRepo: Repository<ScanEntity>,
//   ) {}


//   async postdata(scanDto: ScanDto): Promise<any> {
//     const entity :ScanEntity = this.scanadapter.convertDtoToEntity(scanDto);
//     const count : ScanEntity = await this.scanRepo.save(entity);
//     const saveDto: ScanDto = this.scanadapter.convertEntityToDto(count);
//     return saveDto
//   }


//   async getdata():Promise<any> {
//     const records=await this.scanRepo.find();
//     if(!records.length){
//       return records;
//     }
//     return records;
//   }
// }

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CommonResponseModel, GlobalResponseObject } from "packages/libs/shared-models/src/common/global-response-object";
import { Repository } from "typeorm";
import { ScanEntity } from "../entity/typeo-entity";
import { ScanAdapter } from "../adapters/scan-adapters";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScanDto } from "../dtos/typeo.dto";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ScanResponseModel} from "../../../../../../libs/shared-models/src/shared-model/scan-response-object";


@Injectable()
export class ScanService {


  constructor(
    private adapter: ScanAdapter,
    @InjectRepository(ScanEntity)
    private repository: Repository<ScanEntity>,
  ) { }

  async postdata(req: ScanDto): Promise<ScanResponseModel> {
    const adapterData = this.adapter.convertDtoToEntity(req);
    await this.repository.save(adapterData)
    const internalMessage: string = req.Gst
      ? "Updated Successfully"
      : "Created Successfully";
    return new ScanResponseModel(true, 48896, internalMessage);
    
  }


  async getdata(): Promise<CommonResponseModel> {
    
    const records = await this.repository.find();
    if (records.length === 0) {
      return new GlobalResponseObject(false, 65645, "Data not Found")
    }
    return new CommonResponseModel(true, 111111, "Data Retrieved Successfully", records)
  }

}