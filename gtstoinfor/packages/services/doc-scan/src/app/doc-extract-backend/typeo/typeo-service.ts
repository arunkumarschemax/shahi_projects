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
import { HSNEntity } from "../entity/hsn-entity";
import { VendorFilterModel } from "packages/libs/shared-models/src/shared-model/vendor-filter-model";
import { filterDto } from "../dtos/filter.dto";



@Injectable()
export class ScanService {


  constructor(
    private adapter: ScanAdapter,
    @InjectRepository(ScanEntity)
    private repository: Repository<ScanEntity>,
    // private repository1: Repository<HSNEntity>
  ) { }

  async postdata(req: ScanDto): Promise<ScanResponseModel> {
    console.log(req,"88888888888")
    const adapterData = this.adapter.convertDtoToEntity(req);
    console.log(adapterData,'*******')
    await this.repository.save(adapterData)
    const internalMessage: string = req.GST
      ? "Created Successfully"
      : "Created Successfully";
    return new ScanResponseModel(true, 48896, internalMessage);
    
  }


  async getdata(req:filterDto): Promise<CommonResponseModel> {
    console.log(req,"services")
    
    const records = await this.repository.find({where:{Vendor:req.vendorName},
      relations: ['scanentity']
    });
    if (records.length === 0) {
      return new GlobalResponseObject(false, 65645, "Data not Found")
    }
    return new CommonResponseModel(true, 111111, "Data Retrieved Successfully", records)
  }
}