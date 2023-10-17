import { Injectable } from '@nestjs/common';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { DataSource, Not, Raw } from 'typeorm';
import { AllFabricContentResponseModel, AllFactoriesResponseModel, AllFobResponseModel, CommonResponseModel, FabricContentResponseModel, FactoryActivateDeactivateDto, FobResponseModel, Fobdto, FactoryDto as NewFactoriesDto } from '@project-management-system/shared-models';

// import { FobDto } from './dto/fob.dto';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { InjectDataSource } from '@nestjs/typeorm';
import { FabricContentAdapter } from './adapters/fabric-content.adapter';
import { FabricContent } from './fabric-content.entity';
import { FabricContentRepository } from './fabric-repo/fabric-content.repository';
import { FabricContentDto } from './fabri-content-dto/fabric-dto';

@Injectable()
export class FabricContentService {
  constructor(
    private adaptor: FabricContentAdapter,
    private repository: FabricContentRepository,
    @InjectDataSource()
    private dataSource: DataSource,
  ) { }

  async getFabricContentWithoutRelations(style: string): Promise<FabricContent> {
    const responseModel = await this.repository.findOne({
      where: { style: Raw(alias => `style = '${style}'`) },
    });
    if (responseModel) {
      return responseModel;
    } else {
      return null;
    }
  }


  async createFabricContentplist(Dto: FabricContentDto, isUpdate: boolean): Promise<FabricContentResponseModel> {
    try {
      if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
        throw new FabricContentResponseModel(false, 11107, 'Fabric Content data is empty. At least one value is required.');
      }

      const convertedEntity: FabricContent = this.adaptor.convertDtoToEntity(Dto, isUpdate);
      const savedEntity: FabricContent = await this.repository.save(convertedEntity);
      const savedDto: FabricContentDto = this.adaptor.convertEntityToDto(savedEntity);

      if (savedDto) {
        const name = isUpdate ? 'updated' : 'created';
        const displayValue = isUpdate ? 'Fabric Content Updated Successfully' : 'Fabric Content Created Successfully';
        const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
        const response = new FabricContentResponseModel(true, 1, displayValue);
        return response;
      } else {
        throw new FabricContentResponseModel(false, 11106, 'Fabric Content saved but issue while transforming into DTO');
      }
    } catch (error) {
      return error;
    }
  }




  async getFabricContent(): Promise<FabricContentResponseModel> {
    const data = await this.repository.find()
    const Data: FabricContentDto[] = []
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record)
      Data.push(adapterData)
    }
    return new FabricContentResponseModel(true, 1111, 'Data retreived', Data)
  }


  async getActiveFabricContent(): Promise<FabricContentResponseModel> {
    const data = await this.repository.find({ where: { isActive: true } })
    const activeData: FabricContentDto[] = []
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record)
      activeData.push(adapterData)
    }
    return new FabricContentResponseModel(true, 1111, 'Data retreived', activeData)
  }

  async ActivateOrDeactivate(req: FabricContentDto): Promise<AllFabricContentResponseModel> {
    try {
      const roleExists = await this.getFabricCon(req.id);
      if (roleExists) {
        const roleStatus = await this.repository.update(
          { id: req.id },
          {
            isActive: !roleExists.isActive,
            updatedUser: req.style,
          }
        );
        const internalMessage: string = !roleExists.isActive
          ? "Fabric Content Activated Successfully"
          : "Fabric Content Daectivated Successfully";
        return new AllFabricContentResponseModel(true, 54654, internalMessage);
      } else {
        return new AllFabricContentResponseModel(false, 654695, "Data Not Found");
      }
    } catch (err) {
      return err;
    }
  }

  async getFabricCon(id: number): Promise<FabricContent> {
    const Response = await this.repository.findOne({ where: { id: id }, });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

//   async uploadFobPrice(formData: any): Promise<CommonResponseModel> {
//     const transactionManager = new GenericTransactionManager(this.dataSource)
//     try {
//       await transactionManager.startTransaction()
//       const flag = new Set()
//       const updatedArray = formData.map((obj) => {
//         const updatedObj = {};
//         for (const key in obj) {
//           const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_');
//           updatedObj[newKey] = obj[key];
//         }
//         return updatedObj;
//       });

//       const convertedData = updatedArray.map((obj) => {
//         const updatedObj = {};
//         for (const key in obj) {
//           const value = obj[key];
//           if (value === "") {
//             updatedObj[key] = null;
//           } else {
//             // updatedObj[key] = value;
//             var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
//             updatedObj[key] = value.replace(regexPattern, null);
//             updatedObj[key] = Buffer.from(value, 'utf-8').toString()
//           }
//         }
//         return updatedObj;
//       });
//       const checkData = await this.repository.find({ take: 1 })
//       if (checkData.length > 0) {
//         const deleteExistingData = await transactionManager.getRepository(FabricContent).delete({})
//         if (!deleteExistingData.affected) {
//           await transactionManager.releaseTransaction()
//           return new CommonResponseModel(false, 0, 'Something went wrong in deleting existing data')
//         }
//       }
//       for (const data of convertedData) {
//         // let dtoData = new FobPriceExcelDto(data.Planning_Season_Code,data.Planning_Season_Year,data.Style_Number,data.Color_Code__Last_3_Degits_from_Product_Code,data.Size_Description,data.Shahi_Confirmed_Gross_Price,data.Shahi_Confirmed_Gross_Price_currency_code)
//         if (data.Planning_Season_Code !== null) {

//           const dtoData = new FobDto()
//           dtoData.planningSeasonCode = data.Planning_Season_Code
//           dtoData.planningSeasonYear = data.Planning_Season_Year
//           dtoData.styleNumber = data.Style_Number
//           dtoData.colorCode = data.Color_Code__Last_3_Degits_from_Product_Code
//           dtoData.sizeDescription = data.Size_Description
//           dtoData.shahiConfirmedGrossPrice = data.Shahi_Confirmed_Gross_Price
//           dtoData.shahiConfirmedGrossPriceCurrencyCode = data.Shahi_Confirmed_Gross_Price_currency_code
//           const dtoConversion = this.adaptor.convertDtoToEntity(dtoData)
//           const save = await transactionManager.getRepository(FabricContent).save(dtoConversion)
//           if (!save) {
//             flag.add(false)
//             await transactionManager.releaseTransaction();
//             break;
//           } else {
//             flag.add(true)
//           }
//         } else {
//           break
//         }
//       }
//       if (!(flag.has(false))) {
//         await transactionManager.completeTransaction()
//         return new CommonResponseModel(true, 1, 'Data saved sucessfully')
//       } else {
//         await transactionManager.releaseTransaction()
//         return new CommonResponseModel(false, 0, 'Something went wrong')
//       }
//     } catch (err) {
//       await transactionManager.releaseTransaction()
//       return new CommonResponseModel(false, 0, err)
//     }
//   }
}



