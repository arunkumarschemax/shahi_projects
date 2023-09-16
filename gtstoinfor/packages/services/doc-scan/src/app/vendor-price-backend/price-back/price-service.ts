import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonResponseModel, GlobalResponseObject } from "packages/libs/shared-models/src/common/global-response-object";
import { Repository } from "typeorm";
import {ScanResponseModel} from "../../../../../../libs/shared-models/src/shared-model/scan-response-object";
import { PriceEntity } from "../entity/price-entity";
import { PriceAdapter } from "../adapter/price-adapter";
import { PriceDto } from "../dto/price.dto";
import { PriceResponseModel } from "packages/libs/shared-models/src/price-model";
import { ScanRepo } from "./price-repo";


@Injectable()
export class PriceService {


  constructor(
    private adapter: PriceAdapter,
    @InjectRepository(PriceEntity)
    private repository: Repository<PriceEntity>,
    
  ) { }

  async postdata(req: PriceDto): Promise<PriceResponseModel> {
    console.log(req,"88888888888")
    const query = `SELECT MAX(id) AS id  FROM PriceList ORDER BY created_at DESC`;
    const result = await this.repository.query(query);
    console.log(result,"===")
    

    
    const adapterData = this.adapter.convertDtoToEntity(req,result[0].id);
    await this.repository.save(adapterData)
    const internalMessage: string = req.unitPrice
      ? "Created Successfully"
      : "Created Successfully";
    return new PriceResponseModel(true, 48896, internalMessage);
    
  }


  async getdata(): Promise<CommonResponseModel> {
    
    const records = await this.repository.find();
    if (records.length === 0) {
      return new GlobalResponseObject(false, 65645, "Data not Found")
    }
    return new CommonResponseModel(true, 111111, "Data Retrieved Successfully", records)
  }

}