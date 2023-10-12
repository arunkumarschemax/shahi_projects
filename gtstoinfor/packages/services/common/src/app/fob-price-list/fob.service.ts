import { Injectable } from '@nestjs/common';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { DataSource, Not, Raw } from 'typeorm';
import { AllFactoriesResponseModel, AllFobResponseModel, CommonResponseModel, FactoryActivateDeactivateDto, FobResponseModel, Fobdto, FactoryDto as NewFactoriesDto } from '@project-management-system/shared-models';
import { FobAdapter } from './adapters/fob.adapter';
import { FobRepository } from './repository/fob.repository';
import { FobEntity } from './fob.entity';
import { FobDto } from './dto/fob.dto';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class FobService {
  constructor(
    private adaptor: FobAdapter,
    private repository: FobRepository,
    @InjectDataSource()
    private dataSource: DataSource,
  ) { }

  async getFobWithoutRelations(planningSeasonCode: string): Promise<FobEntity> {
    const responseModel = await this.repository.findOne({
      where: { planningSeasonCode: Raw(alias => `planning_season_code = '${planningSeasonCode}'`) },
    });
    if (responseModel) {
      return responseModel;
    } else {
      return null;
    }
  }

  // async createFobplist(Dto: FobDto, isUpdate: boolean): Promise<FobResponseModel> {
  //   try {
  //     let previousValue
  //     const Dtos: FobDto[] = [];
  //     if (!isUpdate) {
  //       const FobEntity = await this.getFobWithoutRelations(Dto.styleNumber);
  //       if (FobEntity) {
  //         throw new FobResponseModel(false, 11104, 'Fob Price List already exists');
  //       }
  //     }
  //     else {
  //       const fobPrevious = await this.repository.findOne({ where: { id: Dto.id } })
  //       previousValue = (fobPrevious.id)
  //       const FobEntity = await this.getFobWithoutRelations(Dto.styleNumber);
  //       if (FobEntity) {
  //         if (FobEntity.id != Dto.id) {
  //           throw new FobResponseModel(false, 11104, 'Fob Price List already exists');
  //         }
  //       }
  //     }

  //     const convertedEntity: FobEntity = this.adaptor.convertDtoToEntity(Dto, isUpdate);
  //     const savedEntity: FobEntity = await this.repository.save(convertedEntity);
  //     const savedDto: FobDto = this.adaptor.convertEntityToDto(savedEntity);

  //     if (savedDto) {
  //       const Present = savedDto.planningSeasonCode;
  //       const name = isUpdate ? 'updated' : 'created'
  //       const displayValue = isUpdate ? 'Fob Price List Updated Successfully' : 'Fob Price List Created Successfully'
  //       const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
  //       const response = new FobResponseModel(true, 1, isUpdate ? 'Fob Price List Updated Successfully' : 'Fob Price List Created Successfully')
  //       return response
  //     } else {
  //       throw new FobResponseModel(false, 11106, 'Fob Price List saved but issue while transforming into DTO');
  //     }
  //   } catch (error) {

  //     return error;
  //   }

  // } conditional  creating data if is commented for furture use

  async createFobplist(Dto: FobDto, isUpdate: boolean): Promise<FobResponseModel> {
    try {
      if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
        throw new FobResponseModel(false, 11107, 'Fob Price List data is empty. At least one value is required.');
      }

      const convertedEntity: FobEntity = this.adaptor.convertDtoToEntity(Dto, isUpdate);
      const savedEntity: FobEntity = await this.repository.save(convertedEntity);
      const savedDto: FobDto = this.adaptor.convertEntityToDto(savedEntity);

      if (savedDto) {
        const name = isUpdate ? 'updated' : 'created';
        const displayValue = isUpdate ? 'Fob Price List Updated Successfully' : 'Fob Price List Created Successfully';
        const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
        const response = new FobResponseModel(true, 1, displayValue);
        return response;
      } else {
        throw new FobResponseModel(false, 11106, 'Fob Price List saved but issue while transforming into DTO');
      }
    } catch (error) {
      return error;
    }
  }




  async getFobPrice(): Promise<FobResponseModel> {
    const data = await this.repository.find()
    const factoriesData: FobDto[] = []
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record)
      factoriesData.push(adapterData)
    }
    return new FobResponseModel(true, 1111, 'Data retreived', factoriesData)
  }


  async getActiveFob(): Promise<FobResponseModel> {
    const data = await this.repository.find({ where: { isActive: true } })
    const activeData: FobDto[] = []
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record)
      activeData.push(adapterData)
    }
    return new FobResponseModel(true, 1111, 'Data retreived', activeData)
  }

  async ActivateOrDeactivate(req: FobDto): Promise<AllFobResponseModel> {
    try {
      const roleExists = await this.getFobById(req.id);
      if (roleExists) {
        const roleStatus = await this.repository.update(
          { id: req.id },
          {
            isActive: !roleExists.isActive,
            updatedUser: req.planningSeasonCode,
          }
        );
        const internalMessage: string = !roleExists.isActive
          ? "Price List Activated Successfully"
          : "Price List Daectivated Successfully";
        return new AllFobResponseModel(true, 54654, internalMessage);
      } else {
        return new AllFobResponseModel(false, 654695, "Data Not Found");
      }
    } catch (err) {
      return err;
    }
  }

  async getFobById(id: number): Promise<FobEntity> {
    const Response = await this.repository.findOne({ where: { id: id }, });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

  async uploadFobPrice(formData: any): Promise<CommonResponseModel> {
    const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      await transactionManager.startTransaction()
      const flag = new Set()
      const updatedArray = formData.map((obj) => {
        const updatedObj = {};
        for (const key in obj) {
          const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_');
          updatedObj[newKey] = obj[key];
        }
        return updatedObj;
      });

      const convertedData = updatedArray.map((obj) => {
        const updatedObj = {};
        for (const key in obj) {
          const value = obj[key];
          if (value === "") {
            updatedObj[key] = null;
          } else {
            // updatedObj[key] = value;
            var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
            updatedObj[key] = value.replace(regexPattern, null);
            updatedObj[key] = Buffer.from(value, 'utf-8').toString()
          }
        }
        return updatedObj;
      });
      const checkData = await this.repository.find({ take: 1 })
      if (checkData.length > 0) {
        const deleteExistingData = await transactionManager.getRepository(FobEntity).delete({})
        if (!deleteExistingData.affected) {
          await transactionManager.releaseTransaction()
          return new CommonResponseModel(false, 0, 'Something went wrong in deleting existing data')
        }
      }
      for (const data of convertedData) {
        // let dtoData = new FobPriceExcelDto(data.Planning_Season_Code,data.Planning_Season_Year,data.Style_Number,data.Color_Code__Last_3_Degits_from_Product_Code,data.Size_Description,data.Shahi_Confirmed_Gross_Price,data.Shahi_Confirmed_Gross_Price_currency_code)
        if (data.Planning_Season_Code !== null) {

          const dtoData = new FobDto()
          dtoData.planningSeasonCode = data.Planning_Season_Code
          dtoData.planningSeasonYear = data.Planning_Season_Year
          dtoData.styleNumber = data.Style_Number
          dtoData.colorCode = data.Color_Code__Last_3_Degits_from_Product_Code
          dtoData.sizeDescription = data.Size_Description
          dtoData.shahiConfirmedGrossPrice = data.Shahi_Confirmed_Gross_Price
          dtoData.shahiConfirmedGrossPriceCurrencyCode = data.Shahi_Confirmed_Gross_Price_currency_code
          const dtoConversion = this.adaptor.convertDtoToEntity(dtoData)
          const save = await transactionManager.getRepository(FobEntity).save(dtoConversion)
          if (!save) {
            flag.add(false)
            await transactionManager.releaseTransaction();
            break;
          } else {
            flag.add(true)
          }
        } else {
          break
        }
      }
      if (!(flag.has(false))) {
        await transactionManager.completeTransaction()
        return new CommonResponseModel(true, 1, 'Data saved sucessfully')
      } else {
        await transactionManager.releaseTransaction()
        return new CommonResponseModel(false, 0, 'Something went wrong')
      }
    } catch (err) {
      await transactionManager.releaseTransaction()
      return new CommonResponseModel(false, 0, err)
    }
  }
}



