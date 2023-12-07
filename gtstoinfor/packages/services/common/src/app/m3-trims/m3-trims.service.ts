import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, DataSource } from "typeorm";
import { M3TrimsEntity } from "./m3-trims.entity";
import { M3TrimsAdapter } from "./m3-trims.adaptor";
import { M3TrimsRepo } from "./m3-trims.repository";
import { BuyerIdReq, CommonResponseModel, ItemTypeEnum, M3TrimTypeRequest } from "@project-management-system/shared-models";
import { M3TrimsDTO } from "./m3-trims.dto";

@Injectable()
export class M3TrimsService {

  constructor(
    private adapter: M3TrimsAdapter,
    @InjectRepository(M3TrimsEntity)
    private repository: M3TrimsRepo,
    @InjectDataSource()
    private datasource: DataSource
  ) { }

  async createM3Trims(createDto: M3TrimsDTO): Promise<CommonResponseModel> {
    try {
      const existingItemCount = await this.repository.findAndCountBy({trimType : Not (ItemTypeEnum.FABRIC)});
        const nextItemCode: string = createDto.buyerCode + "/" + `TRIM${(existingItemCount.length + 1).toString().padStart(5, '0')}`;
        createDto.itemCode = nextItemCode;
      const entity: M3TrimsEntity = this.adapter.convertDtoToEntity(createDto);
      const count: M3TrimsEntity = await this.repository.save(entity);
      const saveDto: M3TrimsDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3Trims(): Promise<CommonResponseModel> {
    let query = `SELECT m3.m3_trim_Id as m3TrimsId,m3.trim_code AS trimCode,m3.trim_type AS trimType from m3_trims m3 `
    const data = await this.datasource.query(query)
    if (data)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", data)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getM3TrimsByBuyer(req: BuyerIdReq): Promise<CommonResponseModel> {
    try{
      console.log(req)
      const query = "Select m3.m3_trim_Id as m3TrimsId,m3.trim_code AS trimCode,m3.trim_type AS trimType from m3_trims m3 where buyer_id ="+req.buyerId+ " group by m3.trim_type";
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }
    }catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3TrimsByTrimCode(req: M3TrimTypeRequest): Promise<CommonResponseModel> {
    try{
      const query = "Select m3.m3_trim_Id as m3TrimsId,m3.trim_code AS trimCode,m3.trim_type AS trimType from m3_trims m3 where trim_type = '"+req.trimType + "'";
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }
    }catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

}