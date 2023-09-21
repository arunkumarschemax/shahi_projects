import { Injectable } from '@nestjs/common';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { Not, Raw } from 'typeorm';
import { AllFactoriesResponseModel, AllFobResponseModel, FactoryActivateDeactivateDto, FobResponseModel, Fobdto, FactoryDto as NewFactoriesDto } from '@project-management-system/shared-models';
import { FobAdapter } from './adapters/fob.adapter';
import { FobRepository } from './repository/fob.repository';
import { FobEntity } from './fob.entity';
import { FobDto } from './dto/fob.dto';

@Injectable()
export class FobService {
  constructor(
    private adaptor: FobAdapter,
    private repository: FobRepository,
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

  async ActivateOrDeactivate(Req: FobDto): Promise<AllFobResponseModel> {
    try {
      const roleExists = await this.getFobById(
        Req.id
      );
      if (roleExists) {
        const roleStatus = await this.repository.update(
          { id: Req.id },
          {
            isActive: !roleExists.isActive,
            updatedUser: Req.planningSeasonCode,
          }
        );
        const internalMessage: string = !roleExists.isActive
          ? "Activated Successfully"
          : "Daectivated Successfully";
        return new AllFobResponseModel(true, 54654, internalMessage);
      } else {
        return new AllFobResponseModel(false, 654695, "Data Not Found");
      }
    } catch (err) {
      return err;
    }
  }



  async getFobById(id: number): Promise<FobEntity> {
    const Response = await this.repository.findOne({ where: { id: id },});
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }
}


    
